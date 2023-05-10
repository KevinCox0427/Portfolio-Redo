declare global {
    type PortfolioConfig = {
        name: string
        route: string,
        description: string,
        problem: string,
        solution: string,
        logo: string,
        tag: string,
        skills: string[],
        link: string,
        gallery: string[]
    }
}

const portfolioConfig: PortfolioConfig[] = [
    {
        name: "New York Land Quest",
        route: "/portfolio/newyorklandquest",
        description: "Blah Blah Blah",
        logo: "https://placehold.co/600x400",
        problem: "",
        solution: "",
        skills: ['WordPress', 'PHP'],
        tag: "Web Development",
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
        tag: "",
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
        tag: "",
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
        tag: "",
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
        tag: "",
        link: "",
        gallery: []
    }
]

export default portfolioConfig;