import { create } from 'zustand'

export interface BasicInfo {
  name: string
  graduatingYear: string
  coreValue: string
}

export interface CommitteeResponse {
  [committeeId: string]: {
    [questionId: string]: string
  }
}

export interface GeneralResponses {
  whyJoinHBSA: string
}



export interface FormState {
  // Basic Info
  basicInfo: BasicInfo
  
  // Committee Selection
  selectedCommittees: string[]
  
  // Committee-specific responses
  committeeResponses: CommitteeResponse
  
  // General questions
  generalResponses: GeneralResponses
  
  // Resume upload
  resumeUrl: string
  
  // Actions
  setBasicInfo: (info: Partial<BasicInfo>) => void
  setSelectedCommittees: (committees: string[]) => void
  setCommitteeResponse: (committeeId: string, questionId: string, response: string) => void
  setGeneralResponses: (responses: Partial<GeneralResponses>) => void

  setResumeUrl: (url: string) => void
  resetForm: () => void
}

const initialState = {
  basicInfo: {
    name: '',
    graduatingYear: '',
    coreValue: ''
  },
  selectedCommittees: [],
  committeeResponses: {},
  generalResponses: {
    whyJoinHBSA: ''
  },

  resumeUrl: ''
}

export const useFormStore = create<FormState>((set) => ({
  ...initialState,
  
  setBasicInfo: (info) => 
    set((state) => ({
      basicInfo: { ...state.basicInfo, ...info }
    })),
  
  setSelectedCommittees: (committees) => 
    set({ selectedCommittees: committees }),
  
  setCommitteeResponse: (committeeId, questionId, response) =>
    set((state) => ({
      committeeResponses: {
        ...state.committeeResponses,
        [committeeId]: {
          ...state.committeeResponses[committeeId],
          [questionId]: response
        }
      }
    })),
  
  setGeneralResponses: (responses) =>
    set((state) => ({
      generalResponses: { ...state.generalResponses, ...responses }
    })),
  

  
  setResumeUrl: (url) => set({ resumeUrl: url }),
  
  resetForm: () => set(initialState)
})) 