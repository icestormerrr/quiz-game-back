/**
 * getRandomInt - функция, возвращающая случайное целое число в заданном диапазоне
 * @param min - левая граница
 * @param max - правая граница
 * @returns {number} - случайное число
 */
export function getRandomInt(min, max) {
  const leftBorder = Math.ceil(min);
  const rightBorder = Math.floor(max);
  return Math.floor(Math.random() * (rightBorder - leftBorder + 1)) + leftBorder;
}

/**
 * gerVariantWithProbability - функция, возвращающая тот или иной вариант с указанной вероятностью
 * @param variantA - первый вариант
 * @param variantB- второй вариант
 * @param probability - вероятность выпадения первого
 * @returns вариант который выпал
 */
export function gerVariantWithProbability(variantA, variantB, probability = 0.5) {
  const answer = Math.random();
  if (answer < probability) return variantA
  return variantB
}