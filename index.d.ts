type Work<T> = () => Promise<T>;

/**
 * 
 */
export default function LimitTasks<T>(limit: number): (work: Work<T>) => Promise<T>;