import {Entity} from "./entity";
import {Runtime} from "./runtime";
import {comp, Tag, TypeRegistry} from "../type/types";
import {Logger,log} from "../utils/logger";
import {Serializable} from "../net/protocol";
import {Buffer} from "../thirdparty/buffer";

@comp('Component')
export class IComponent implements Serializable{
    static __defineName = 'Component'
    static get defineName (){
        return this.__defineName
    }

    protected dirty: boolean = true
    protected entity: Entity = null
    protected runtime: Runtime = null

    static get defineDepends(): Array<string> {
        return []
    }

    static get defineData(): Object {
        return {}
    }

    static nosync:boolean = false


    get nosync():boolean{
        return Object.getPrototypeOf(this).constructor.nosync;
    }

    get defineDepends(): Array<string> {
        return Object.getPrototypeOf(this).constructor.defineDepends;
    }

    get defineName(): string {
        return Object.getPrototypeOf(this).constructor.defineName();
    }

    constructor() {

    }

    reset(){
        this.dirty = true
    }

    setRuntime(runtime:Runtime){
        this.runtime = runtime
    }

    getComponentName():string {
        return Object.getPrototypeOf(this).constructor.defineName;
    }

    getSibling<T extends IComponent>(comp:{new():T}):T {
        if (this.entity) {
            return this.entity.get(comp);
        }
    }

    setEntity(ent:Entity) {
        this.entity = ent;
    }

    isClient():boolean {
        return this.runtime.isClient();
    }

    getEntity():Entity {
        return this.entity;
    }

    getRuntime():Runtime {
        return this.runtime;
    }

    markDirty() {
        this.dirty = true;
        this.onDirty && this.onDirty(this.entity, this.entity.getRuntime());
        if (this.entity) {
            this.entity.markDirty(this);
        }
        if (this.runtime && this.runtime.dirtyComponents.indexOf(this.entity) === -1) {
            this.runtime.dirtyComponents.push(this.entity);
        }
    }

    isDirty() {
        return this.dirty;
    }

    clean() {
        this.dirty = false;
    }

    onAdd(ent:Entity, runtime:Runtime) {

    }

    onRemove(ent:Entity, runtime:Runtime) {

    }

    onCreate(runtime:Runtime) {

    }

    onDestroy(runtime:Runtime) {

    }

    onDirty(ent:Entity, runtime:Runtime) {

    }

    onRegister(runtime:Runtime) {

    }


    unmarshalFrom(buff:Buffer) {

    }

    marshalTo():Buffer {

        return null
    }
}