
const LimitTasks = (maxTasks = 1) => {
    if (!Number.isInteger(maxTasks) || maxTasks <= 0)
        throw `"maxTasks" must be a whole positive number greater than zero`;

    const tasks = [];
    let running = 0;

    const dispatch = async () => {
        const ongoing = tasks.splice(0, Math.min(maxTasks, tasks.length, Math.max(0, maxTasks - running)));
        running += ongoing.length;
        if (!running) return;

        await Promise.allSettled(ongoing.map(async ([work, resolve, reject]) => {
            try {
                resolve(await work?.());
            } catch (error) {
                reject(error);
            }
        }));

        if ((running -= ongoing.length) < maxTasks && tasks.length) dispatch();
    };

    return (work) => {
        return new Promise((resolve, reject) => {
            tasks.push([work, resolve, reject]);
            if (running < maxTasks) dispatch();
        });
    };
};

module.exports = LimitTasks;