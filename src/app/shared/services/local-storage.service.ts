import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class LocalStorageService {
	constructor() {}

	/**
	 * Sets an item in the localStorage with the specified key-value pair.
	 *
	 * @param {string} key - The key for the item to be added.
	 * @param {string} value - The value associated with the key.
	 * @return {void}
	 */
	addItem(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	/**
	 * Retrieves the value associated with the specified key from the browser's localStorage.
	 *
	 * @param {string} key - The key used to identify the value in localStorage.
	 * @returns {string | null} - The value associated with the specified key, or null if the key does not exist.
	 */
	getItem(key: string): string | null {
		return localStorage.getItem(key);
	}

	/**
	 * Deletes an item from the local storage.
	 *
	 * @param {string} key - The key of the item to be deleted.
	 *
	 * @return {void}
	 */
	deleteItem(key: string): void {
		localStorage.removeItem(key);
	}

	/**
	 * Clears all the data stored in the localStorage
	 * @returns {void}
	 */
	clear(): void {
		localStorage.clear();
	}
}
