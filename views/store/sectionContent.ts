import { createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./store";

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

    }
});

export default sectionContentSlice.reducer;