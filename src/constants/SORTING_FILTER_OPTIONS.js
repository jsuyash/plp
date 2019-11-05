export const SORTING_OPTIONS = [
  {
    label: "Price: Ascending",
    value: "PRICE_ASC"
  },
  {
    label: "Price: Descending",
    value: "PRICE_DESC"
  }
];

export const LIST_LIMIT = 6;

export const FILTER_OPTIONS = [
  {
    label: "Colors",
    value: "COLORS",
    type: "MULTI_SELECT",
    options: [
      {
        label: "Blue",
        value: "BLUE"
      },
      {
        label: "Black",
        value: "BLACK"
      },
      {
        label: "Green",
        value: "GREEN"
      },
      {
        label: "Red",
        value: "RED"
      },
      {
        label: "White",
        value: "WHITE"
      }
    ]
  },
  {
    label: "Sleeves",
    value: "SLEEVES",
    type: "MULTI_SELECT",
    options: [
      {
        label: "Half Sleeves",
        value: "HALF_SLEEVES"
      },
      {
        label: "Full Sleeves",
        value: "FULL_SLEEVES"
      },
      {
        label: "3/4th Sleeves",
        value: "THREE_FOURTH_SLEEVES"
      }
    ]
  },
  {
    label: "Size",
    value: "SIZE",
    type: "MULTI_SELECT",
    options: [
      {
        label: "Extra Small",
        value: "XS",
        code: "EXTRA_SMALL"
      },
      {
        label: "Small",
        value: "S",
        code: "SMALL"
      },
      {
        label: "Medium",
        value: "M",
        code: "MEDIUM"
      },
      {
        label: "Large",
        value: "L",
        code: "LARGE"
      },
      {
        label: "Extra Large",
        value: "XL",
        code: "EXTRA_LARGE"
      }
    ]
  },
  {
    label: "Customer Ratings",
    value: "CUSTOMER_RATINGS",
    type: "SINGLE_SELECT",
    options: [
      {
        label: "5 Stars",
        value: 5
      },
      {
        label: "4 Stars",
        value: 4
      },
      {
        label: "3 Stars",
        value: 3
      },
      {
        label: "2 Stars",
        value: 2
      },
      {
        label: "1 Stars",
        value: 1
      }
    ]
  }
];

export const FILTER_KEY_MAPPER = {
  COLORS: "color",
  SLEEVES: "sleeveSize",
  SIZE: "availSizes",
  CUSTOMER_RATINGS: "customerRating"
};
