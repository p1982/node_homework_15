export abstract class Factory<T> {
    entity: any
    abstract createEntity(): Promise<T>
}