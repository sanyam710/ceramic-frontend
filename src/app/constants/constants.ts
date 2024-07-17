export class Constants {
    public static readonly USER_TYPE_ADMIN = 1
    public static readonly USER_TYPE_OWNER = 2
    public static readonly USER_TYPE_STAFF = 3
    public static readonly USER_STATUS = {
        1: "Published",
        2: "Inactive",
        3: "Discard"

    }
    public static readonly STOCK_TYPE = {
        1: "Sample",
        2: "Stock",

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
    public static readonly PUBLISHED = 1;
    public static readonly DRAFT = 2;
    public static readonly DISCARD = 3;

}