import { SortMode } from '@interfaces';

export const sortModes: SortMode[] = [
  {
    value: null,
    order: null,
    icon: '',
    text: '',
    property: null,
  },
  {
    value: 'priceASC',
    order: 'ASC',
    icon: 'fa fa-cofwheel',
    text: 'From cheapest',
    property: 'price',
  },
  {
    value: 'priceDSC',
    order: 'DSC',
    icon: 'fa fa-cofwheel',
    text: 'From most expensive',
    property: 'price',
  },
  {
    value: 'abcASC',
    order: 'ASC',
    icon: 'fa fa-cofwheel',
    text: 'in ABC order',
    property: 'name',
  },
  {
    value: 'abcDSC',
    order: 'DSC',
    icon: 'fa fa-cofwheel',
    text: 'In reverse ABC order',
    property: 'name',
  }
];
