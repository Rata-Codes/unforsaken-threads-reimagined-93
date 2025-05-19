
import { toast } from "@/components/ui/use-toast";

const AIRTABLE_API_TOKEN = "patcWr0ljbUna72fs.2cf84158eccfb42382d11a3d0cb2420fc1048410bafa6d2ddc1f82131828191c";

// Customer Management table
const CUSTOMER_BASE_ID = "app6QP94PBeYrFUA4";
const CUSTOMER_TABLE_ID = "tblxCvCeSVeewjKYG";

// Order Management table
const ORDER_BASE_ID = "appaEYSBPmnMRDwUf";
const ORDER_TABLE_ID = "tbl6w5ebyWS64nVQr";

// Types
export interface Customer {
  id?: string;
  fields?: {
    CID?: string;
    Name?: string;
    OrderID?: string;
    Phone?: string;
    Address?: string;
    Username?: string;
    Password?: string;
  };
}

export interface Order {
  id?: string;
  fields?: {
    OrderID?: string;
    Products?: string;
    TotalQuantity?: number;
    TotalAmount?: number;
    CID?: string;
    Date?: string;
    Time?: string;
  };
}

// Generic fetch function for Airtable API
async function fetchFromAirtable(
  baseId: string,
  tableId: string,
  method: string,
  path: string = "",
  data?: any
) {
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}${path}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    if (data && (method === 'POST' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'An error occurred');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Airtable API Error:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive"
    });
    throw error;
  }
}

// Customer Management Functions
export async function getCustomers() {
  return fetchFromAirtable(CUSTOMER_BASE_ID, CUSTOMER_TABLE_ID, 'GET');
}

export async function getCustomerByUsername(username: string) {
  const formula = encodeURIComponent(`{Username} = "${username}"`);
  const result = await fetchFromAirtable(
    CUSTOMER_BASE_ID, 
    CUSTOMER_TABLE_ID, 
    'GET', 
    `?filterByFormula=${formula}`
  );
  return result.records.length > 0 ? result.records[0] : null;
}

export async function createCustomer(customer: Customer) {
  return fetchFromAirtable(CUSTOMER_BASE_ID, CUSTOMER_TABLE_ID, 'POST', '', {
    records: [{ fields: customer.fields }]
  });
}

export async function updateCustomer(customerId: string, fields: Partial<Customer['fields']>) {
  return fetchFromAirtable(CUSTOMER_BASE_ID, CUSTOMER_TABLE_ID, 'PATCH', '', {
    records: [{ id: customerId, fields }]
  });
}

// Order Management Functions
export async function getOrders() {
  return fetchFromAirtable(ORDER_BASE_ID, ORDER_TABLE_ID, 'GET');
}

export async function getOrdersByCustomerId(cid: string) {
  const formula = encodeURIComponent(`{CID} = "${cid}"`);
  return fetchFromAirtable(ORDER_BASE_ID, ORDER_TABLE_ID, 'GET', `?filterByFormula=${formula}`);
}

export async function createOrder(order: Order) {
  return fetchFromAirtable(ORDER_BASE_ID, ORDER_TABLE_ID, 'POST', '', {
    records: [{ fields: order.fields }]
  });
}

// Helper function to generate order ID
export function generateOrderId() {
  return `TBE-${Math.floor(100000 + Math.random() * 900000)}`;
}
