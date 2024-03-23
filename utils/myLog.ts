export const initMyLog = ()=> {
    if (console.log) {
        const old = console.log
        console.log = (...args)=> {
            args[0] = `Log - ${process.server ? 'Server' : 'Client'} - ${new Date().toLocaleString()} ${args[0]}`
            old.apply(console, args);
        }
    }
}