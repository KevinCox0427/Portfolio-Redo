import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, readdirSync, lstatSync } from 'fs';

export default defineConfig(({ mode }) => {
    // Hash table to only bundle the entry pages.
    let entryObject = {};
    scanDirectory('.');
    
    return {
        build: {
            publicDir: 'public',
            outDir: 'public',
            emptyOutDir: false,
            minify: true,
            rollupOptions: {
                input: entryObject,
                output: {
                    entryFileNames: `js/[name].js`,
                    chunkFileNames: `js/[name].js`,
                    assetFileNames: `[name].[ext]`
                }
            }
        },
        plugins: [
            react({
                include: "**/*.tsx",
            }),
        ],
        server: {
          hmr: true,
          open: '/index.html',
          port: 3001
        }
    }

    /**
     * A function to recursively check the "pages" directory for any React pages that need bundling.
     * If the file is ".tsx" and contains the function hydrateRoot(), then we add it to "entryObject" as a key value pair.
     * @param directory The entry point to start scanning.
     */
    function scanDirectory(directory) {
      // Guard clause for ignored directories.
      if(directory.includes("node_modules") || directory.includes('dist') || directory.includes('public')) return;

      // Looping through each file/folder.
      readdirSync(directory).forEach(pointer => {
        // If the file ends with .tsx and calls the hydrateRoot() function, then we must bundle it.
        if(pointer.endsWith('.tsx') && readFileSync(`${directory}/${pointer}`).includes('hydrateRoot(')) {
          entryObject = {...entryObject, 
            [pointer.split('.tsx')[0]]: `${directory}/${pointer}`
          }
        }
        // Otherwise, if it's a folder, then recursively call this function.
        else if(lstatSync(`${directory}/${pointer}`).isDirectory()) {
          scanDirectory(`${directory}/${pointer}`);
        }
      });
    }
});