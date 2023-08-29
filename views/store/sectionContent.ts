import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialStore from "./cachedstore";

// Setting the default order and HTML content for each section.
export const sectionDefaults = {
    data: {
        order: 1,
        navName: 'Optimized Data',
        content: '<h3>It always starts with the data...</h3><p>Creating a functional and intuitive website entirely depends on modeling good quality data upfront. I can model simplistic yet highly effective data structures, not only to create fast websites now, but to provide a solid foundation for additions in the future.</p><p><em>Let\'s fill in a data structure to create some new products together!</em></p>'
    },
    integration: {
        order: 2,
        navName: 'Seamless integrations',
        content: '<h3>Integrations give more power to your applications...</h3><p>Integrations have been instrumental in translating collected user data into real-world action items. This is responsible for many aspects of the web, such as online payments, automated emails, analytics, cloud storage, CMS tools, or any resource management software. I can assess and integrate any software your technology stack needs, whether it uses an SDK, an API, webhooks, or an RPC.</p><p><em>Let\'s use an integration with Spotify together to find you some new music!</em></p>'
    },
    authentication: {
        order: 3,
        navName: 'Secure authentication',
        content: '<h3>In order to have users, you need secure authentication...</h3><p>Authentication on the web has given us many functionalities we tend to take for granted: e-commerce, cloud storage, and social media. I can give you peace of mind through secure implementations of many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from scratch.</p><p><em>Let\'s create you a user from scratch together!</em></p>'
    },
    analytics: {
        order: 4,
        navName: 'Detailed analytics',
        content: '<h3><h3>Powerful user interfaces give you the greatest control...</h3><p>UIs are the primary way users interact with any software. This enables users to enter large datasets, change important functionalities, or customize the look down to the smallest of details. So, the better the implementation, the better the user experience. I can create, adjust, and expand your website\'s UIs to enable you and your teams with powerful tools that best suit you.</p><p><em>Let\'s use a UI to screw up all my hard work!</em></p></em></p><p></p>'
    },
    ui: {
        order: 5,
        navName: 'User interfaces to control it all',
        content: '<h3>Powerful user interfaces give you the greatest control...</h3><p>UIs are the primary way users interact with any software. This enables users to enter large datasets, change important functionalities, or customize the look down to the smallest of details. So, the better the implementation, the better the user experience. I can create, adjust, and expand your website\'s UIs to enable you and your teams with powerful tools that best suit you.</p><p><em>Let\'s use a UI to screw up all my hard work!</em></p>'
    },
    web: {
        order: 6,
        navName: 'Beautiful websites to show it all',
        content: '<h3>Beautiful websites give your messages the widest reach...</h3><p>In an age where the majority of customers\' first encounters with an organization take place online, it becomes vitally important to provide unique and effective experiences. I can create, plan, design, and mockup any graphical materials to fit, further strengthen, or form your brand.</p><p><em>Check out my portfolio to see some of my work!</em></p>'
    }
}

const sectionContentSlice = createSlice({
    name: 'sectionContent',
    initialState: initialStore ? initialStore.sectionContent : sectionDefaults as Store["sectionContent"],
    reducers: {
        /**
         * Reducer to update the name of a section.
         * @param name The string value to overwrite with.
         * @param section The section who is being overwritten.
         */
        changeSectionName: (state, action: PayloadAction<{ name: string, section: keyof Store["sectionContent"] }>) => {
            state[action.payload.section].navName = action.payload.name;
        },

        /**
         * Reducer to update the content of a section.
         * @param name The string value to overwrite with.
         * @param section The section who is being overwritten.
         */
        changeSectionContent: (state, action: PayloadAction<{ content: string, section: keyof Store["sectionContent"] }>) => {
            state[action.payload.section].content = action.payload.content;
        },

        /**
         * Reducer to move the order of the sections.
         * @param from The name of the current section that's being moved.
         * @param to The name of the section that's the destination.
         */
        moveSection: (state, action: PayloadAction<{ from: keyof Store["sectionContent"], to: keyof Store["sectionContent"] }>) => {
            // Setting references for the from and to sections' data.
            const toSection = state[action.payload.to];
            const fromSection = state[action.payload.from];

            // Looping through each section and overwritting it's "order" value to reflect the movement.
            Object.keys(state).map(sectionName => {
                const currentSection = state[sectionName];

                // If this is the section we're moving, just set the order to the one specified in the parameter.
                if(sectionName === action.payload.from) {
                    state[sectionName].order = toSection.order
                }

                // If the section is being moved upwards, then the sections inbetween the from and to sections must move down 1.
                if(fromSection.order > toSection.order) {
                    if(currentSection.order >= toSection.order && currentSection.order < fromSection.order) {
                        state[sectionName].order = currentSection.order + 1;
                    }
                }
                // If the section is being moved downwards, then the sections inbetween the from and to sections must move up 1.
                else {
                    if(currentSection.order <= toSection.order && currentSection.order > fromSection.order) {
                        state[sectionName].order = currentSection.order - 1;
                    }
                }
            });
        },

        /**
         * Reducer to reset the values of a section.
         * @param action The name of the section that will be reset.
         */
        resetSection: (state, action: PayloadAction<keyof Store["sectionContent"]>) => {
            state[action.payload] = sectionDefaults[action.payload as keyof typeof sectionDefaults];
        }
    }
});

export default sectionContentSlice.reducer;
export const { changeSectionContent, changeSectionName, moveSection, resetSection } = sectionContentSlice.actions;