declare global {
    type PortfolioConfig = {
        name: string
        route: string,
        description: string[],
        problem?: string[],
        solution?: string[],
        logo: string,
        tag: string,
        skills: string[],
        link?: string,
        gallery: string[]
    }

    type SectionContent = {
        order: number,
        navName: string,
        content: string
    }
    
    type AllSectionContent = {
        data: SectionContent,
        authentication: SectionContent,
        integration: SectionContent,
        analytics: SectionContent,
        ui: SectionContent,
        web: SectionContent
    }
}

export {}