import { resolve } from 'path';
import { spawn, execSync } from 'child_process';
import { readdirSync, watch, existsSync, readFileSync, writeFileSync, lstatSync } from 'fs';

/**
 * Keeping track of when the node server started and is running.
 */
let currentCompileTimestamp = Date.now();
let currentNodeProcess = spawn('node', [resolve('dist/server.js')], {stdio: 'inherit'});

try {
    console.log('Compiling...\n');
    /**
     * Running the typescript, webpack and sass CLI commands to start the build.
     */
    execSync('tsc');
    execSync('sass styles:dist/public/css');
    execSync('webpack');
    /**
     * Recursively watching each folder for changes.
     */
    watchDirectory();
    console.log('Watching!\n');
} catch (e:any) {
    /**
     * If there are errors from the intial commands, log them.
     * The filtering is for cleaning up the error messages.
     */
    if(Array.isArray(e.output)) {
        console.log(
            e.output
                .filter((err:any) => err instanceof Buffer)
                .map((buffer:Buffer) => {
                    return `Error:\n\n${buffer.toString()}`
                })
                .filter((errStr:string) => errStr.length > 'Error:\n\n '.length)
                .join('\n')
        );
    }
}

/**
 * A function that recursively reads directories and sets event listeners to run CLI commands when a user saves.
 * @param folder The root folder to start with. If none provided, starts at the root folder.
 */
function watchDirectory(folder:string = '.') {
    /**
     * Recursive callback for sub-folders.
     */
    readdirSync(folder).forEach(file => {
        if(lstatSync(`${folder}/${file}`).isDirectory() && folder !== 'node_modues') {
            watchDirectory(`${folder}/${file}`);
        }
    });
    /**
     * Adding an event to fire when a user saves anything in this directory with fs's watch()
     */
    watch(folder === '.' ? './' : folder, (_, file) => {
        /**
         * If it's in the public folder, that means it's an asset and we'll copy + paste it.
         */
        if(folder.startsWith('./public')) {
            writeFileSync(`${folder}/${file}`, readFileSync(`${folder}/${file}`));
        }
        /**
         * If it's in the 'pages' directory, then it's a React file and it needs to be bundled.
         */
        if(folder.startsWith('./pages')) {
            runProcess('webpack', file);
        }
        /**
         * For Sass.
         */
        if(file.endsWith('.scss')) {
            runProcess('sass styles:dist/public/css', file);
        }
        /**
         * For Typescript.
         */
        if(file.endsWith('.ts') || file.endsWith('tsx')) {
            runProcess('tsc', file);
        }
    });
}

/**
 * A function to run a CLI command. If it succeeds, it'll restart the node server.
 * @param command The CLI command to run
 * @param fileName The file name to print.
 */
function runProcess(command: string, fileName: string) {
    /**
     * Since fs's watch event is called several times when a file is saved, we'll apply a 200ms buffer to each time this is called.
     */
    if(Date.now() - currentCompileTimestamp < 200) return;
    console.log(`\nCompiling: ${fileName} (${command})`);

    /**
     * Kills the current node process to run the CLI .
     */
    currentNodeProcess.kill('SIGTERM');
    
    /**
     * Running the command.
     */
    let compiler = spawn(command, {shell: true});
    let compilerMessage = '';

    /**
     * Setting event listeners to store outgoing messages
     */
    if(compiler.stderr) compiler.stderr.on('data', data => {
        compilerMessage = data.toString();
    });
    if(compiler.stdout) compiler.stdout.on('data', data => {
        compilerMessage = data.toString();
    });

    /**
     * Recording this process's start timestamp.
     * Then we'll assign it to the global variable to compare it when it's finished.
     */
    const processTimestamp = Date.now();
    currentCompileTimestamp = processTimestamp;

    /**
     * Callback function to check the success of the process when it finishes.
     */
    compiler.on('exit', code => {
        /**
         * If the global timestamp is different than this one, then that means this process is stale.
         */
        if(processTimestamp != currentCompileTimestamp) return;

        /**
         * If fails, then print it's error message and return.
         */
        if(code !== 0 && compilerMessage) {
            /**
             * Since Webpack error messages are ugly.
             */
            if(command === 'Webpack') {
                const errorArray = compilerMessage.split('ERROR');
                errorArray.splice(0, 1);
                compilerMessage = 'ERROR' + errorArray.join('\n\nERROR').split('\nwebpack ')[0];
            }
            console.log(`\nError:\n\n${compilerMessage}\n\nWaiting for changes...\n`);
            return;
        }
        
        /**
         * Otherwise if sucessful, start a new node process.
         */
        console.log('Done!\n');
        currentNodeProcess = spawn('node', [resolve('dist/server.js')], {stdio: 'inherit'});
    });
}