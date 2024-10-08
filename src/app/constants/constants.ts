export class Constants {
    public static readonly USER_TYPE_ADMIN = 1
    public static readonly USER_TYPE_OWNER = 2
    public static readonly USER_TYPE_STAFF = 3
    public static readonly PUBLISHED = 1;
    public static readonly DRAFT = 2;
    public static readonly DISCARD = 3; 
    public static readonly USER_STATUS = {
        1: "Published",
        2: "Inactive",
        3: "Discard"

    }
    public static readonly STOCK_TYPE = {
        1: "Sample",
        2: "Stock",
        3: "Broken",

    }
    public static readonly PRODUCT_SIZE = {
        "18 * 12": "1.5",
        "12 * 12": "1",
        "16 * 16": "1.7",
        "32 * 64": "27.55",
        "8 * 4": "32",
        "6 * 4": "24",
        "2 * 4": "8",
        "2 * 2": "4",
        "2 * 1": "2",
    }
    public static readonly PIECE_PER_BOX = {
        "18 * 12": "",
        "12 * 12": "",
        "16 * 16": "5",
        "32 * 64": "2",
        "8 * 4": "2",
        "6 * 4": "2",
        "2 * 4": "2",
        "2 * 2": "4",
        "2 * 1": "5",
    }
    public static readonly PRODUCT_TYPES = {
        1: "Tiles",
        2: "Marble",
        3: "Pipe",
        4: "Cement",
        5: "Sanitary",

    }
    public static readonly MODE_OF_PAYMENTS = {
        1: "Cash",
        2: "Cheque",
        3: "Online"
    }
    public static readonly UNIT_TYPE = {
        1: "Box",
        // 2: "Square Feet",
    }

}