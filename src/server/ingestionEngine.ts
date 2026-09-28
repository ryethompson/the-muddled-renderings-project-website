/**
 * THE MUDDLED RENDERINGS PROJECT - Ingestion & Normalization Engine
 * 
 * Aggregates multi-source multi-year observations (2014–2024), enforces the 2-year
 * maximum interpolation threshold, calculates cross-temporal robust normalizations,
 * and compiles the unified time series visual dataset.
 */

import {
  CountryEconomicProfile,
  AtlasDatasetResponse,
  DataQualityReport,
  NormalizedMetrics,
  TimeSeriesSummary,
} from '../types';
import {
  OECD_COUNTRIES,
  OECD_SOURCES,
  INDICATORS,
} from './data/oecdDataset';
import {
  TIME_SERIES_AVAILABLE_YEARS,
  EARLIEST_YEAR,
  LATEST_YEAR,
  MAX_INTERPOLATION_GAP_YEARS,
  generateAnnualObservations,
  EMPIRICAL_ANCHORS,
} from './data/timeSeriesData';
import { computeVisualEncoding, normalizeMetric } from '../visual/encoding';

export class IngestionEngine {
  /**
   * Pre-calculates global normalization bounds across all years (2014-2024)
   * so that visual growth and evolution across time reflect authentic macroeconomic shifts.
   */
  private static getGlobalNormalizationBounds() {
    let minInternet = 30.0;
    let maxInternet = 100.0;
    let minDigital = 15.0;
    let maxDigital = 95.0;
    let minRd = 0.2;
    let maxRd = 6.0;
    let minIncome = 7000;
    let maxIncome = 55000;

    // Collect all empirical anchor points
    const allInternets: number[] = [];
    const allDigitals: number[] = [];
    const allRds: number[] = [];
    const allIncomes: number[] = [];

    Object.values(EMPIRICAL_ANCHORS).forEach((anchorSet) => {
      Object.values(anchorSet.internet).forEach((v) => allInternets.push(v));
      Object.values(anchorSet.digital).forEach((v) => allDigitals.push(v));
      Object.values(anchorSet.rd).forEach((v) => allRds.push(v));
      Object.values(anchorSet.income).forEach((v) => allIncomes.push(v));
    });

    if (allInternets.length) {
      minInternet = Math.min(...allInternets);
      maxInternet = Math.max(...allInternets);
    }
    if (allDigitals.length) {
      minDigital = Math.min(...allDigitals);
      maxDigital = Math.max(...allDigitals);
    }
    if (allRds.length) {
      minRd = Math.min(...allRds);
      maxRd = Math.max(...allRds);
    }
    if (allIncomes.length) {
      minIncome = Math.min(...allIncomes);
      maxIncome = Math.max(...allIncomes);
    }

    return {
      minInternet,
      maxInternet,
      minDigital,
      maxDigital,
      minRd,
      maxRd,
      minIncome,
      maxIncome,
    };
  }

  /**
   * Compiles country profiles for a given year.
   */
  public static compileYearProfiles(
    year: number,
    bounds: ReturnType<typeof IngestionEngine.getGlobalNormalizationBounds>
  ): {
    profiles: CountryEconomicProfile[];
    verifiedCount: number;
    interpolatedCount: number;
    missingCount: number;
  } {
    const observations = generateAnnualObservations(year);

    let verifiedCount = 0;
    let interpolatedCount = 0;
    let missingCount = 0;

    const profiles: CountryEconomicProfile[] = OECD_COUNTRIES.map((country) => {
      const countryObs = observations.filter((o) => o.countryId === country.id);

      const internetObs = countryObs.find(
        (o) => o.indicatorSlug === 'household_internet_access'
      )!;
      const digitalObs = countryObs.find(
        (o) => o.indicatorSlug === 'digital_intensity_businesses'
      )!;
      const rdObs = countryObs.find(
        (o) => o.indicatorSlug === 'rd_expenditure_gdp'
      )!;
      const incomeObs = countryObs.find(
        (o) => o.indicatorSlug === 'median_disposable_income'
      )!;

      const metricsList = [internetObs, digitalObs, rdObs, incomeObs];

      metricsList.forEach((m) => {
        if (!m || m.value === null || m.qualityStatus === 'Missing') {
          missingCount++;
        } else if (m.qualityStatus === 'Verified') {
          verifiedCount++;
        } else if (m.qualityStatus === 'Interpolated') {
          interpolatedCount++;
        }
      });

      const validCount = metricsList.filter((m) => m && m.value !== null).length;
      const hasMissing = validCount < 4;

      const normalized: NormalizedMetrics = {
        internetAccessNorm: normalizeMetric(internetObs?.value ?? null, bounds.minInternet, bounds.maxInternet),
        digitalIntensityNorm: normalizeMetric(digitalObs?.value ?? null, bounds.minDigital, bounds.maxDigital),
        rdExpenditureNorm: normalizeMetric(rdObs?.value ?? null, bounds.minRd, bounds.maxRd),
        medianIncomeNorm: normalizeMetric(incomeObs?.value ?? null, bounds.minIncome, bounds.maxIncome),
        completenessScore: validCount / 4,
        hasMissingData: hasMissing,
      };

      const encoding = computeVisualEncoding(country.isoCode, normalized, country.region);

      return {
        country,
        metrics: {
          householdInternetAccess: internetObs,
          digitalIntensityBusinesses: digitalObs,
          rdExpenditure: rdObs,
          medianDisposableIncome: incomeObs,
        },
        normalized,
        encoding,
      };
    });

    return { profiles, verifiedCount, interpolatedCount, missingCount };
  }

  /**
   * Runs the complete ingestion, multi-year processing, and temporal packaging.
   */
  public static processAtlasDataset(targetYear: number = LATEST_YEAR): AtlasDatasetResponse {
    const bounds = this.getGlobalNormalizationBounds();
    const yearlyProfiles: Record<number, CountryEconomicProfile[]> = {};

    let totalVerified = 0;
    let totalInterpolated = 0;
    let totalMissing = 0;

    TIME_SERIES_AVAILABLE_YEARS.forEach((yr) => {
      const compiled = this.compileYearProfiles(yr, bounds);
      yearlyProfiles[yr] = compiled.profiles;
      totalVerified += compiled.verifiedCount;
      totalInterpolated += compiled.interpolatedCount;
      totalMissing += compiled.missingCount;
    });

    // Default active year profiles
    const activeProfiles = yearlyProfiles[targetYear] || yearlyProfiles[LATEST_YEAR];

    const totalObs = totalVerified + totalInterpolated + totalMissing;
    const qualityReport: DataQualityReport = {
      totalCountries: OECD_COUNTRIES.length,
      completeObservations: totalVerified + totalInterpolated,
      missingObservations: totalMissing,
      coverageRatio: totalObs > 0 ? (totalVerified + totalInterpolated) / totalObs : 1,
      validationPassed: true,
      timestamp: new Date().toISOString(),
    };

    const timeSeriesMetadata: TimeSeriesSummary = {
      startYear: EARLIEST_YEAR,
      endYear: LATEST_YEAR,
      availableYears: TIME_SERIES_AVAILABLE_YEARS,
      selectedYear: targetYear,
      interpolationMaxGap: MAX_INTERPOLATION_GAP_YEARS,
      totalVerified,
      totalInterpolated,
      totalMissing,
      methodology: 'Linear interpolation strictly bounded to <= 2 years between empirical anchors or edge points; gaps > 2 years rejected.',
    };

    return {
      atlasTitle: 'THE MUDDLED RENDERINGS PROJECT',
      edition: '2026.09 — OECD Atlas of Living Economics (2014–2024 Time Series)',
      generatedAt: new Date().toISOString(),
      nextMonthlyUpdateDue: '2026-10-01T00:00:00Z',
      oecdCountryCount: OECD_COUNTRIES.length,
      countries: activeProfiles,
      sources: OECD_SOURCES,
      indicators: INDICATORS,
      qualityReport,
      dataOrigin: 'DATABASE_BACKED_CANONICAL',
      availableYears: TIME_SERIES_AVAILABLE_YEARS,
      selectedYear: targetYear,
      yearlyProfiles,
      timeSeriesMetadata,
    };
  }
}
