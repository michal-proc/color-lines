/**
 * @module Interfaces
 * @category OTHER
 * @todo Przechowywanie interfejsów wykorzystywanych w innych klasach
 */

/**
 * Wykorzystywane w Klasie Gameplay 
 * @param tab Tablica dwuwymiarowa, początkowa wypełniona zerami
 */
export interface Main {
    tab: (number | string)[][]
}

/**
 * Wykorzystywane w Klasie Generator
 * @param size Wymiar planszy do wyświetlenia na stronie
 */
export interface Size {
    size: number
}

/**
 * Wykorzystywane w Klasie Reload
 * @param button Przycisk, pod którego będzie podpięty event
 * @param operation Wydarzenie, po którym ma wykonywać się funkcja
 */
export interface Button {
    button: HTMLElement,
    operation: string
}