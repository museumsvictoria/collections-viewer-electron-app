// Concatenate array of strings, accepts separator
export const joinStrings = (array, separator = ', ') => {
  if (!array.length) return null;

  return array.filter(element => element).join(separator);
};

export const createMarkup = array =>
  array
    .filter(element => element.value)
    .map(element =>
      [element.term ? element.term : null, element.value ? element.value : null]
        .filter(moreElement => moreElement)
        .join(' - '),
    )
    .map(element => `<p>${element}</p>`)
    .join('');

export const createDescription = (object) => {
  if (object.objectSummary) return object.objectSummary;

  if (object.type === 'Specimen') {
    return createMarkup([
      {
        term: 'Preffered common name',
        value: object.taxonomy ? object.taxonomy.commonName : null,
      },
      {
        term: 'Collected from',
        value: object.collectionSite
          ? joinStrings(
            [
              object.collectionSite.nearestNamedPlace,
              object.collectionSite.town,
              object.collectionSite.district,
              object.collectionSite.state,
              object.collectionSite.country,
              object.collectionSite.continent,
              object.collectionSite.ocean,
            ],
            ', ',
          )
          : null,
      },
      {
        term: 'Era',
        value: object.collectionSite
          ? joinStrings(
            [
              object.collectionSite.geologyEpoch,
              object.collectionSite.geologyPeriod,
              object.collectionSite.geologyEra,
            ],
            ', ',
          )
          : null,
      },
      {
        term: 'Rock unit',
        value: object.collectionSite
          ? joinStrings(
            [
              object.collectionSite.geologyFormation,
              object.collectionSite.geologyGroup,
            ],
            ', ',
          )
          : null,
      },
    ]);
  }

  return null;
};
