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
}

export {}