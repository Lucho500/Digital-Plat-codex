export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feature_flags: {
        Row: {
          id: string
          is_enabled: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id: string
          is_enabled?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          is_enabled?: boolean
          updated_at?: string
          updated_by?: string | null
        }
      }
      feature_flag_logs: {
        Row: {
          id: number
          flag_id: string
          old_value: boolean | null
          new_value: boolean | null
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: number
          flag_id: string
          old_value?: boolean | null
          new_value?: boolean | null
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          flag_id?: string
          old_value?: boolean | null
          new_value?: boolean | null
          user_id?: string | null
          created_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          legal_name: string | null
          siren: string | null
          vat_number: string | null
          address: string | null
          postal_code: string | null
          city: string | null
          country: string | null
          phone: string | null
          email: string | null
          fiscal_year_start: string | null
          fiscal_year_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          legal_name?: string | null
          siren?: string | null
          vat_number?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          fiscal_year_start?: string | null
          fiscal_year_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          legal_name?: string | null
          siren?: string | null
          vat_number?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          fiscal_year_start?: string | null
          fiscal_year_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          company_id: string | null
          first_name: string | null
          last_name: string | null
          role: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          company_id?: string | null
          first_name?: string | null
          last_name?: string | null
          role?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string | null
          first_name?: string | null
          last_name?: string | null
          role?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          company_id: string
          number: string
          date: string
          due_date: string
          client_name: string
          client_email: string | null
          client_address: string | null
          client_vat_number: string | null
          subtotal: number
          vat_amount: number
          total: number
          status: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          number: string
          date: string
          due_date: string
          client_name: string
          client_email?: string | null
          client_address?: string | null
          client_vat_number?: string | null
          subtotal?: number
          vat_amount?: number
          total?: number
          status?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          number?: string
          date?: string
          due_date?: string
          client_name?: string
          client_email?: string | null
          client_address?: string | null
          client_vat_number?: string | null
          subtotal?: number
          vat_amount?: number
          total?: number
          status?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          company_id: string
          name: string
          legal_name: string | null
          vat_number: string | null
          address: string | null
          postal_code: string | null
          city: string | null
          country: string | null
          email: string | null
          phone: string | null
          payment_terms: number | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          legal_name?: string | null
          vat_number?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          email?: string | null
          phone?: string | null
          payment_terms?: number | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          legal_name?: string | null
          vat_number?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string | null
          email?: string | null
          phone?: string | null
          payment_terms?: number | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      supplier_invoices: {
        Row: {
          id: string
          company_id: string
          supplier_id: string
          number: string
          date: string
          due_date: string
          subtotal: number
          vat_amount: number
          total: number
          status: string | null
          payment_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          supplier_id: string
          number: string
          date: string
          due_date: string
          subtotal?: number
          vat_amount?: number
          total?: number
          status?: string | null
          payment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          supplier_id?: string
          number?: string
          date?: string
          due_date?: string
          subtotal?: number
          vat_amount?: number
          total?: number
          status?: string | null
          payment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          company_id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          position: string | null
          hire_date: string | null
          contract_type: string | null
          base_salary: number
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          position?: string | null
          hire_date?: string | null
          contract_type?: string | null
          base_salary?: number
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          position?: string | null
          hire_date?: string | null
          contract_type?: string | null
          base_salary?: number
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payrolls: {
        Row: {
          id: string
          company_id: string
          employee_id: string
          period_start: string
          period_end: string
          gross_amount: number
          net_amount: number
          charges_amount: number
          status: string | null
          payment_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          employee_id: string
          period_start: string
          period_end: string
          gross_amount?: number
          net_amount?: number
          charges_amount?: number
          status?: string | null
          payment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          employee_id?: string
          period_start?: string
          period_end?: string
          gross_amount?: number
          net_amount?: number
          charges_amount?: number
          status?: string | null
          payment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tax_declarations: {
        Row: {
          id: string
          company_id: string
          type: string
          period_start: string
          period_end: string
          due_date: string
          amount: number
          status: string | null
          submission_date: string | null
          reference_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          type: string
          period_start: string
          period_end: string
          due_date: string
          amount?: number
          status?: string | null
          submission_date?: string | null
          reference_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          type?: string
          period_start?: string
          period_end?: string
          due_date?: string
          amount?: number
          status?: string | null
          submission_date?: string | null
          reference_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          user_id: string | null
          step_id: number | null
          event: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          step_id?: number | null
          event?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          step_id?: number | null
          event?: string | null
          timestamp?: string
        }
      }
      ,onboarding_progress: {
        Row: {
          user_id: string
          current_step: number
          form_data: Json
          completed: boolean
          updated_at: string | null
        }
        Insert: {
          user_id: string
          current_step?: number
          form_data: Json
          completed?: boolean
          updated_at?: string | null
        }
        Update: {
          user_id?: string
          current_step?: number
          form_data?: Json
          completed?: boolean
          updated_at?: string | null
        }
      }
      ,ocr_sessions: {
        Row: {
          session_id: string
          user_id: string
          created_at: string
          expires_at: string
          parsed_data: Json | null
          parsed_at: string | null
        }
        Insert: {
          session_id: string
          user_id: string
          created_at?: string
          expires_at: string
          parsed_data?: Json | null
          parsed_at?: string | null
        }
        Update: {
          session_id?: string
          user_id?: string
          created_at?: string
          expires_at?: string
          parsed_data?: Json | null
          parsed_at?: string | null
        }
      }
      ,experts: {
        Row: {
          id: string
          name: string
          sectors: string[]
          rating: number
          max_load: number
          current_load: number
        }
        Insert: {
          id?: string
          name: string
          sectors: string[]
          rating: number
          max_load?: number
          current_load?: number
        }
        Update: {
          id?: string
          name?: string
          sectors?: string[]
          rating?: number
          max_load?: number
          current_load?: number
        }
      }
      ,specialists: {
        Row: {
          id: string
          name: string
          sectors: string[]
          languages: string[]
          rating: number
          max_load: number
          current_load: number
        }
        Insert: {
          id?: string
          name: string
          sectors: string[]
          languages: string[]
          rating: number
          max_load?: number
          current_load?: number
        }
        Update: {
          id?: string
          name?: string
          sectors?: string[]
          languages?: string[]
          rating?: number
          max_load?: number
          current_load?: number
        }
      }
      ,advisory_sessions: {
        Row: {
          id: string
          account_id: string
          expert_id: string
          specialist_id: string
          status: string
          created_at: string
          start_at: string | null
          meeting_url: string | null
        }
        Insert: {
          id?: string
          account_id: string
          expert_id: string
          specialist_id: string
          status?: string
          created_at?: string
          start_at?: string | null
          meeting_url?: string | null
        }
        Update: {
          id?: string
          account_id?: string
          expert_id?: string
          specialist_id?: string
          status?: string
          created_at?: string
          start_at?: string | null
          meeting_url?: string | null
        }
      }
      ,advisor_slots: {
        Row: {
          id: string
          advisor_id: string
          start_at: string
          end_at: string
          is_booked: boolean
        }
        Insert: {
          id?: string
          advisor_id: string
          start_at: string
          end_at: string
          is_booked?: boolean
        }
        Update: {
          id?: string
          advisor_id?: string
          start_at?: string
          end_at?: string
          is_booked?: boolean
        }
      }
    }
  }
}