declare global {
    type PortfolioConfig = {
        name: string
        route: string,
        description: string,
        problem: string,
        solution: string,
        logo: string,
        skills: string[],
        link: string,
        gallery: string[]
    }[]
}

const portfolioConfig: PortfolioConfig = [
    {
        name: "New York Land Quest",
        route: "/portfolio/newyorklandquest",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        link: "",
        gallery: []
    },
    {
        name: "Red Barn HPC",
        route: "/portfolio/redbarnhpc",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        link: "",
        gallery: []
    },
    {
        name: "Long Island Exclusive",
        route: "/portfolio/longislandexclusive",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        link: "",
        gallery: []
    },
    {
        name: "Beck Automotive",
        route: "/portfolio/beck",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        link: "",
        gallery: []
    },
    {
        name: "Little Venice",
        route: "/portfolio/littlevenice",
        description: "",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: [],
        link: "",
        gallery: []
    }
]

export default portfolioConfig;