/**
 * @module InternalStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
export class InternalStorage {
  get(key: string): any {}
  set(key: string, value: any): any {}
  remove(key: string): any {}
}
