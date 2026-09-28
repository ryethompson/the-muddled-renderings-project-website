/**
 * THE MUDDLED RENDERINGS PROJECT - Relational Database Schema
 * Conceptual Schema for PostgreSQL / Cloud SQL / Firebase SQL Connect
 * 
 * Tables:
 * - countries
 * - indicators
 * - data_sources
 * - observations
 * - data_releases
 * - ingestion_audit_logs
 */

export interface DbCountry {
  id: string;              // PRIMARY KEY (e.g. 'oecd-nor')
  iso_code: string;        // VARCHAR(3) UNIQUE NOT NULL (e.g. 'NOR')
  iso2_code: string;       // VARCHAR(2) NOT NULL (e.g. 'NO')
  name: string;            // VARCHAR(100) NOT NULL (e.g. 'Norway')
  official_name: string;   // VARCHAR(255)
  oecd_member_since: number;// INT NOT NULL
  region: string;          // VARCHAR(50) NOT NULL
  display_order: number;   // INT NOT NULL
  lat: number;             // NUMERIC(8, 4)
  lng: number;             // NUMERIC(8, 4)
  field_pos_x: number;     // NUMERIC(8, 2)
  field_pos_y: number;     // NUMERIC(8, 2)
  created_at: string;
  updated_at: string;
}

export interface DbIndicator {
  id: string;              // PRIMARY KEY
  slug: string;            // VARCHAR(100) UNIQUE NOT NULL
  name: string;            // VARCHAR(255) NOT NULL
  short_label: string;     // VARCHAR(100) NOT NULL
  description: string;     // TEXT NOT NULL
  artistic_dimension: string;// TEXT NOT NULL
  unit: string;            // VARCHAR(50) NOT NULL
  unit_symbol: string;     // VARCHAR(20) NOT NULL
  source_preference: string;// VARCHAR(50) NOT NULL
  visualization_role: string;// TEXT NOT NULL
  definition: string;      // TEXT NOT NULL
  methodology_url: string; // VARCHAR(500)
  min_plausible: number;   // NUMERIC(12, 4)
  max_plausible: number;   // NUMERIC(12, 4)
  created_at: string;
  updated_at: string;
}

export interface DbDataSource {
  id: string;              // PRIMARY KEY
  organization: string;    // VARCHAR(100) NOT NULL
  dataset_name: string;    // VARCHAR(255) NOT NULL
  dataset_code: string;    // VARCHAR(100) NOT NULL
  url: string;             // VARCHAR(500) NOT NULL
  methodology_url: string; // VARCHAR(500) NOT NULL
  citation_text: string;   // TEXT NOT NULL
  update_cadence: string;  // VARCHAR(50) NOT NULL
  last_checked_date: string;// DATE
  created_at: string;
  updated_at: string;
}

export interface DbObservation {
  id: string;              // PRIMARY KEY
  country_id: string;      // REFERENCES countries(id)
  indicator_slug: string;  // REFERENCES indicators(slug)
  value: number | null;    // NUMERIC(14, 4)
  unit: string;            // VARCHAR(50) NOT NULL
  reference_period: string;// VARCHAR(20) NOT NULL (e.g. '2023')
  frequency: string;       // VARCHAR(20) NOT NULL
  source_id: string;       // REFERENCES data_sources(id)
  publication_date: string;// DATE
  retrieved_at: string;    // TIMESTAMPTZ NOT NULL
  revision_status: string; // VARCHAR(50) NOT NULL
  quality_status: string;  // VARCHAR(50) NOT NULL
  notes?: string;
  created_at: string;
}

export interface DbDataRelease {
  id: string;              // PRIMARY KEY
  source_id: string;       // REFERENCES data_sources(id)
  release_date: string;    // DATE
  retrieval_date: string;  // TIMESTAMPTZ
  observations_count: number;
  status: string;          // VARCHAR(50)
  notes: string;
}

export interface DbIngestionAuditLog {
  id: string;
  triggered_at: string;
  completed_at: string;
  records_processed: number;
  records_updated: number;
  anomalies_detected: number;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  summary: string;
}
