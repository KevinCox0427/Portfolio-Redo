declare global {
    // Declaration merging the window object to include "ServerProps". This is how we'll pass properties from the server to the client side.
    interface Window {
        ServerProps: Partial<ServerProps>;
    }

    type ServerProps = {
        homePageProps: HomePageProps,
        aboutPageProps: AboutPageProps,
        projectPageProps: ProjectPageProps
    }

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