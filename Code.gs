// Unified Restaurant Management System - Code.gs
// FULLY COMPATIBLE with existing Employee app data structure
// Based on Employee Code.gs with Management features added
// Updated to consolidate inventory snapshots and detailed sales with petty cash support

// Database structure definition (EXACT from Employee Code.gs)
const REQUIRED_SHEETS = {
  // Enhanced Employee Management with language support (UNCHANGED)
  Employees: {
    requiredHeaders: [
      'id', 'name', 'email', 'phone', 'role', 'hourly_rate', 'hire_date',
      'employee_pin', 'pin_active', 'preferred_language', 'last_login', 'active', 'created_at', 'updated_at'
    ]
  },
  
  // All other sheets remain EXACTLY the same as Employee Code.gs
  Ingredients: {
    requiredHeaders: [
      'id', 'name', 'category', 'unit', 'cost_per_unit', 'quantity', 'min_stock', 'max_stock',
      'supplier_id', 'last_purchase_date', 'storage_location', 'created_at', 'updated_at'
    ]
  },
  
  Products: {
    requiredHeaders: [
      'id', 'name', 'category', 'description', 'selling_price', 'cost_price',
      'active', 'created_at', 'updated_at'
    ]
  },
  
  Recipes: {
    requiredHeaders: [
      'id', 'product_id', 'ingredient_id', 'quantity_needed', 'unit',
      'created_at', 'updated_at'
    ]
  },
  
  Orders: {
    requiredHeaders: [
      'id', 'order_number', 'order_date', 'order_time', 'customer_name', 
      'order_type', 'status', 'total_amount', 'payment_method',
      'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  OrderItems: {
    requiredHeaders: [
      'id', 'order_id', 'product_id', 'quantity', 'unit_price', 'total_price',
      'created_at', 'updated_at'
    ]
  },
  
  DailyShawarmaStack: {
    requiredHeaders: [
      'id', 'date', 'starting_weight_kg', 'stack_cost_qar', 'shaving_weight_kg', 
      'staff_meals_weight_kg', 'orders_weight_kg', 'remaining_weight_kg', 
      'loss_weight_kg', 'loss_percentage', 'revenue_qar', 'profit_per_kg',
      'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  DailyRawProteins: {
    requiredHeaders: [
      'id', 'count_date', 'frozen_chicken_breast_opening', 'frozen_chicken_breast_received',
      'frozen_chicken_breast_expired', 'frozen_chicken_breast_remaining',
      'chicken_shawarma_opening', 'chicken_shawarma_received', 
      'chicken_shawarma_expired', 'chicken_shawarma_remaining',
      'steak_opening', 'steak_received', 'steak_expired', 'steak_remaining',
      'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  DailyMarinatedProteins: {
    requiredHeaders: [
      'id', 'count_date', 'fahita_chicken_opening', 'fahita_chicken_received',
      'fahita_chicken_expired', 'fahita_chicken_remaining',
      'chicken_sub_opening', 'chicken_sub_received', 
      'chicken_sub_expired', 'chicken_sub_remaining',
      'spicy_strips_opening', 'spicy_strips_received',
      'spicy_strips_expired', 'spicy_strips_remaining',
      'original_strips_opening', 'original_strips_received',
      'original_strips_expired', 'original_strips_remaining',
      'marinated_steak_opening','marinated_steak_received',
      'marinated_steak_expired', 'marinated_steak_remaining',
      'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  DailyBreadTracking: {
    requiredHeaders: [
      'id', 'count_date', 'saj_bread_opening', 'saj_bread_received',
      'saj_bread_expired', 'saj_bread_remaining',
      'pita_bread_opening', 'pita_bread_received',
      'pita_bread_expired', 'pita_bread_remaining',
      'bread_rolls_opening', 'bread_rolls_received',
      'bread_rolls_expired', 'bread_rolls_remaining',
      'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  DailyHighCostItems: {
    requiredHeaders: [
      'id', 'count_date', 'cream_opening', 'cream_received',
      'cream_expired', 'cream_remaining',
      'mayo_opening', 'mayo_received', 'mayo_expired', 'mayo_remaining',
      'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  DailySales: {
    requiredHeaders: [
      'id', 'sales_date', 'total_revenue', 'shawarma_revenue', 'other_food_revenue',
      'cash_sales', 'card_sales', 'delivery_aggregator_1', 'delivery_aggregator_2',
      'petty_cash_total', 'notes', 'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  WeeklyInventory: {
    requiredHeaders: [
      'id', 'week_start_date', 'week_end_date', 'category', 'item_name',
      'opening_quantity', 'received_quantity', 'expired_quantity', 'remaining_quantity',
      'unit', 'notes', 'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  DailyInventoryCount: {
    requiredHeaders: [
      'id', 'count_date', 'ingredient_id', 'ingredient_name', 'opening_quantity', 'received_quantity',
      'closing_quantity', 'calculated_usage', 'waste_quantity', 'notes',
      'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  DailyProductSales: {
    requiredHeaders: [
      'id', 'sales_date', 'product_name', 'quantity_sold', 'unit_price', 'total_revenue',
      'unit_cost', 'total_cost', 'profit_margin', 'created_at', 'updated_at'
    ]
  },

  Item: {
    requiredHeaders: [
      'id', 'name', 'category', 'unit', 'frequency', 'is_prepared',
      'cost_per_unit', 'min_stock', 'max_stock', 'storage_location', 'active', 'created_at', 'updated_at'
    ]
  },

  SnapshotLog: {
    requiredHeaders: [
      'id', 'item_id', 'date', 'closing_quantity', 'notes', 'employee_id', 'created_at', 'updated_at'
    ]
  },

  PettyCashDetail: {
    requiredHeaders: [
      'id', 'daily_sales_id', 'category', 'description', 'amount', 'paid_by', 'employee_id', 'created_at', 'updated_at'
    ]
  },
  
  Suppliers: {
    requiredHeaders: [
      'id', 'name', 'contact_person', 'phone', 'email', 'address',
      'payment_terms', 'active', 'created_at', 'updated_at'
    ]
  },
  
  SystemSettings: {
    requiredHeaders: [
      'id', 'setting_name', 'setting_value', 'description', 'created_at', 'updated_at'
    ]
  }
};

// Entry point for unified web app
function doGet(e) {
  initializeDatabase();
  
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Restaurant Management System')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Include HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Enhanced database initialization (EXACT from Employee Code.gs)
function initializeDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let isNewDatabase = false;
  
  Object.entries(REQUIRED_SHEETS).forEach(([sheetName, config]) => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      isNewDatabase = true;
      
      sheet.getRange(1, 1, 1, config.requiredHeaders.length)
           .setValues([config.requiredHeaders])
           .setBackground('#E6E6E6')
           .setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, config.requiredHeaders.length);
    } else {
      // Check and update headers for existing sheets
      const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const requiredHeaders = config.requiredHeaders;
      
      if (existingHeaders.length !== requiredHeaders.length || 
          !requiredHeaders.every((header, index) => existingHeaders[index] === header)) {
        
        let existingData = [];
        if (sheet.getLastRow() > 1) {
          existingData = sheet.getRange(2, 1, sheet.getLastRow() - 1, existingHeaders.length).getValues();
        }
        
        sheet.clear();
        sheet.getRange(1, 1, 1, requiredHeaders.length)
             .setValues([requiredHeaders])
             .setBackground('#E6E6E6')
             .setFontWeight('bold');
        sheet.setFrozenRows(1);
        
        if (existingData.length > 0) {
          existingData.forEach(row => {
            const newRow = new Array(requiredHeaders.length).fill('');
            
            existingHeaders.forEach((oldHeader, oldIndex) => {
              const newIndex = requiredHeaders.indexOf(oldHeader);
              if (newIndex !== -1 && row[oldIndex] !== undefined) {
                newRow[newIndex] = row[oldIndex];
              }
            });
            
            sheet.appendRow(newRow);
          });
        }
        
        sheet.autoResizeColumns(1, requiredHeaders.length);
      }
    }
  });
  
  if (isNewDatabase) {
    initializeDefaultEmployeeData();
  } else {
    initializeDefaultEmployeeData();
  }
  
  return isNewDatabase;
}

// Enhanced employee initialization (EXACT from Employee Code.gs)
function initializeDefaultEmployeeData() {
  const employeeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employees');
  
  if (!employeeSheet) {
    console.log('Employees sheet not found');
    return;
  }
  
  if (employeeSheet.getLastRow() > 1) {
    console.log('Employee data already exists, checking for language column...');
    
    const headers = employeeSheet.getRange(1, 1, 1, employeeSheet.getLastColumn()).getValues()[0];
    let needsUpdate = false;
    let newHeaders = [...headers];
    
    // Add missing columns for existing data
    if (!headers.includes('employee_pin')) {
      newHeaders.push('employee_pin');
      needsUpdate = true;
    }
    if (!headers.includes('pin_active')) {
      newHeaders.push('pin_active');
      needsUpdate = true;
    }
    if (!headers.includes('preferred_language')) {
      newHeaders.push('preferred_language');
      needsUpdate = true;
    }
    if (!headers.includes('last_login')) {
      newHeaders.push('last_login');
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      employeeSheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
      
      const existingRows = employeeSheet.getLastRow() - 1;
      if (existingRows > 0) {
        for (let i = 2; i <= employeeSheet.getLastRow(); i++) {
          const row = employeeSheet.getRange(i, 1, 1, employeeSheet.getLastColumn()).getValues()[0];
          
          if (!row[headers.indexOf('employee_pin')] && newHeaders.includes('employee_pin')) {
            const pinIndex = newHeaders.indexOf('employee_pin') + 1;
            employeeSheet.getRange(i, pinIndex).setValue('1234');
          }
          if (!row[headers.indexOf('pin_active')] && newHeaders.includes('pin_active')) {
            const pinActiveIndex = newHeaders.indexOf('pin_active') + 1;
            employeeSheet.getRange(i, pinActiveIndex).setValue(true);
          }
          if (!row[headers.indexOf('preferred_language')] && newHeaders.includes('preferred_language')) {
            const langIndex = newHeaders.indexOf('preferred_language') + 1;
            employeeSheet.getRange(i, langIndex).setValue('en'); // Default to English
          }
          if (!row[headers.indexOf('last_login')] && newHeaders.includes('last_login')) {
            const lastLoginIndex = newHeaders.indexOf('last_login') + 1;
            employeeSheet.getRange(i, lastLoginIndex).setValue('');
          }
        }
      }
    }
    return;
  }
  
  console.log('Adding default employee data with language preferences');
  
  const defaultEmployees = [
    {name: 'Ahmad', email: 'ahmad@restaurant.com', role: 'staff', pin: '1234', language: 'ar'},
    {name: 'Fatima', email: 'fatima@restaurant.com', role: 'supervisor', pin: '5678', language: 'ar'},
    {name: 'Mohammed', email: 'mohammed@restaurant.com', role: 'staff', pin: '9999', language: 'ar'},
    {name: 'Sarah', email: 'sarah@restaurant.com', role: 'staff', pin: '1111', language: 'en'},
    {name: 'John', email: 'john@restaurant.com', role: 'staff', pin: '2222', language: 'en'}
  ];
  
  defaultEmployees.forEach(emp => {
    const id = Utilities.getUuid();
    const row = [
      id, emp.name, emp.email, '', emp.role, 15, new Date(),
      emp.pin, true, emp.language, '', true, new Date(), new Date()
    ];
    employeeSheet.appendRow(row);
  });
  
  initializeSystemSettingsIfNeeded();
}

function initializeSystemSettingsIfNeeded() {
  const settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SystemSettings');
  
  if (!settingsSheet) {
    console.log('SystemSettings sheet not found');
    return;
  }
  
  if (settingsSheet.getLastRow() > 1) {
    console.log('System settings already exist, skipping initialization');
    return;
  }
  
  const settings = [
    {
      setting_name: 'management_pin',
      setting_value: '1234',
      description: 'PIN required for updating existing daily entries'
    },
    {
      setting_name: 'session_timeout_hours',
      setting_value: '8',
      description: 'Employee session timeout in hours'
    },
    {
      setting_name: 'default_language',
      setting_value: 'en',
      description: 'Default language for new employees'
    }
  ];
  
  settings.forEach(setting => {
    const id = Utilities.getUuid();
    const row = [
      id, setting.setting_name, setting.setting_value, setting.description,
      new Date(), new Date()
    ];
    settingsSheet.appendRow(row);
  });
}

// Enhanced employee validation (EXACT from Employee Code.gs)
function validateEmployeePin(pin) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employees');
    if (!sheet) return JSON.stringify({success: false, message: 'Employee system not initialized'});
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const pinIndex = headers.indexOf('employee_pin');
    const nameIndex = headers.indexOf('name');
    const idIndex = headers.indexOf('id');
    const roleIndex = headers.indexOf('role');
    const activeIndex = headers.indexOf('active');
    const pinActiveIndex = headers.indexOf('pin_active');
    const lastLoginIndex = headers.indexOf('last_login');
    const languageIndex = headers.indexOf('preferred_language');
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (String(row[pinIndex]).trim() === String(pin).trim() && 
          row[activeIndex] === true && 
          row[pinActiveIndex] === true) {
        
        // Update last login
        sheet.getRange(i + 1, lastLoginIndex + 1).setValue(new Date());
        
        return JSON.stringify({
          success: true,
          employee: {
            id: row[idIndex],
            name: row[nameIndex],
            pin: row[pinIndex],
            role: row[roleIndex] || 'staff', // Default to 'staff' for compatibility
            preferred_language: row[languageIndex] || 'en'
          }
        });
      }
    }
    
    return JSON.stringify({success: false, message: 'Invalid PIN or inactive employee'});
    
  } catch (error) {
    Logger.log('Error validating employee PIN: ' + error.toString());
    return JSON.stringify({success: false, message: 'Authentication error'});
  }
}

// Update employee language preference (EXACT from Employee Code.gs)
function updateEmployeeLanguage(employeeId, language) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employees');
    if (!sheet) {
      return JSON.stringify({success: false, message: 'Employee system not initialized'});
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const idIndex = headers.indexOf('id');
    const languageIndex = headers.indexOf('preferred_language');
    const updatedAtIndex = headers.indexOf('updated_at');
    
    if (languageIndex === -1) {
      return JSON.stringify({success: false, message: 'Language preference column not found'});
    }
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idIndex] === employeeId) {
        // Update language preference
        sheet.getRange(i + 1, languageIndex + 1).setValue(language);
        
        // Update timestamp
        if (updatedAtIndex !== -1) {
          sheet.getRange(i + 1, updatedAtIndex + 1).setValue(new Date());
        }
        
        return JSON.stringify({
          success: true, 
          message: 'Language preference updated successfully',
          language: language
        });
      }
    }
    
    return JSON.stringify({success: false, message: 'Employee not found'});
    
  } catch (error) {
    Logger.log('Error updating employee language: ' + error.toString());
    return JSON.stringify({success: false, message: 'Error updating language preference'});
  }
}

// Get management PIN (EXACT from Employee Code.gs)
function getManagementPin() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SystemSettings');
    if (!sheet) return '1234';
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const nameIndex = headers.indexOf('setting_name');
    const valueIndex = headers.indexOf('setting_value');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][nameIndex] === 'management_pin') {
        return data[i][valueIndex];
      }
    }
    return '1234';
  } catch (error) {
    Logger.log('Error getting management PIN: ' + error.toString());
    return '1234';
  }
}

// Validate management PIN (EXACT from Employee Code.gs)
function validateManagementPin(inputPin) {
  try {
    const correctPin = getManagementPin();
    return String(inputPin).trim() === String(correctPin).trim();
  } catch (error) {
    Logger.log('Management PIN validation error: ' + error.toString());
    return false;
  }
}

// Check if entry exists for given date (EXACT from Employee Code.gs)
function checkExistingEntry(dateString) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const targetDate = new Date(dateString).toDateString();
    
    const shawarmaData = getSheetData('DailyShawarmaStack');
    
    const existingEntry = shawarmaData.find(row => {
      if (!row.date) return false;
      return new Date(row.date).toDateString() === targetDate;
    });
    
    if (existingEntry) {
      return JSON.stringify({
        exists: true,
        entry: existingEntry,
        entryDate: targetDate
      });
    }
    
    return JSON.stringify({
      exists: false,
      entryDate: targetDate
    });
    
  } catch (error) {
    Logger.log('Error checking existing entry: ' + error.toString());
    throw new Error('Failed to check existing entry: ' + error.message);
  }
}

// Delete existing entries for a specific date (EXACT from Employee Code.gs)
function deleteExistingEntries(dateString) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const targetDate = new Date(dateString).toDateString();
    
    const sheetsToClean = [
      'DailyShawarmaStack',
      'DailyRawProteins',
      'DailyMarinatedProteins',
      'DailyBreadTracking',
      'DailyHighCostItems',
      'DailySales',
      'SnapshotLog'
    ];

    const deletedSalesIds = [];

    sheetsToClean.forEach(sheetName => {
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) return;
      
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const dateFieldName = sheetName === 'DailyShawarmaStack' ? 'date' : 
                           sheetName === 'DailySales' ? 'sales_date' : 'count_date';
      const dateIndex = headers.indexOf(dateFieldName);
      
      if (dateIndex === -1) return;
      
      const rowsToDelete = [];
      for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][dateIndex] && new Date(data[i][dateIndex]).toDateString() === targetDate) {
          if (sheetName === 'DailySales') {
            const idIdx = headers.indexOf('id');
            if (idIdx !== -1) {
              deletedSalesIds.push(data[i][idIdx]);
            }
          }
          rowsToDelete.push(i + 1);
        }
      }
      
      rowsToDelete.forEach(rowIndex => {
        sheet.deleteRow(rowIndex);
      });
    });

    if (deletedSalesIds.length > 0) {
      const pettySheet = ss.getSheetByName('PettyCashDetail');
      if (pettySheet) {
        const pData = pettySheet.getDataRange().getValues();
        const pHeaders = pData[0];
        const salesIdIdx = pHeaders.indexOf('daily_sales_id');
        const pRowsToDelete = [];
        for (let i = pData.length - 1; i >= 1; i--) {
          if (deletedSalesIds.includes(pData[i][salesIdIdx])) {
            pRowsToDelete.push(i + 1);
          }
        }
        pRowsToDelete.forEach(r => pettySheet.deleteRow(r));
      }
    }

  } catch (error) {
    Logger.log('Error deleting existing entries: ' + error.toString());
    throw new Error('Failed to delete existing entries: ' + error.message);
  }
}

// Save daily entry data (EXACT from Employee Code.gs)
function saveDailyEntry(entryData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const entryDate = entryData.date ? new Date(entryData.date).toDateString() : new Date().toDateString();
    const employeeId = entryData.employeeId || 'unknown';
    
    if (entryData.isUpdate) {
      if (!entryData.managementPin || !validateManagementPin(entryData.managementPin)) {
        return JSON.stringify({
          success: false,
          message: 'Invalid management PIN. Update not authorized.'
        });
      }
      
      deleteExistingEntries(entryDate);
    }
    
    // Save Shawarma Stack Data
    if (entryData.shawarmaStack) {
      const shawarmaSheet = ss.getSheetByName('DailyShawarmaStack');
      const stackData = entryData.shawarmaStack;
      
      const startingWeight = parseFloat(stackData.starting_weight) || 0;
      const shavingWeight = parseFloat(stackData.shaving_weight) || 0;
      const staffMealsWeight = parseFloat(stackData.staff_meals_weight) || 0;
      const ordersWeight = parseFloat(stackData.orders_weight) || 0;
      const remainingWeight = parseFloat(stackData.remaining_weight) || 0;
      
      const shawarmaRevenue = parseFloat(entryData.sales?.shawarma_revenue) || 0;
      const costPerKg = 12.35;
      const stackCost = startingWeight * costPerKg;
      
      const lossWeight = startingWeight - (shavingWeight + staffMealsWeight + ordersWeight + remainingWeight);
      const lossPercentage = startingWeight > 0 ? (lossWeight / startingWeight) * 100 : 0;
      
      const revenuePerKg = ordersWeight > 0 ? shawarmaRevenue / ordersWeight : 0;
      const actualCostPerKg = startingWeight > 0 ? stackCost / startingWeight : 0;
      const profitPerKg = revenuePerKg - actualCostPerKg;
      
      const row = [
        Utilities.getUuid(), entryDate, startingWeight, stackCost, shavingWeight,
        staffMealsWeight, ordersWeight, remainingWeight, lossWeight, lossPercentage,
        shawarmaRevenue, profitPerKg, employeeId, new Date(), new Date()
      ];
      
      shawarmaSheet.appendRow(row);
    }
    
    // Save Sales Data
    if (entryData.sales) {
      saveSalesData(entryData, entryDate, employeeId);
    }

    // Save Inventory Snapshot
    saveInventorySnapshot(entryData, entryDate, employeeId);
    
    const successMessage = entryData.isUpdate ? 
      `Daily entry for ${entryDate} updated successfully!` : 
      `Daily entry for ${entryDate} saved successfully!`;
    
    return JSON.stringify({success: true, message: successMessage});
    
  } catch (error) {
    Logger.log('Error saving daily entry: ' + error.toString());
    throw new Error('Failed to save daily entry: ' + error.message);
  }
}

// Generate daily report (EXACT from Employee Code.gs)
function generateDailyReport(date) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    let targetDateString;
    if (date) {
      const targetDate = new Date(date + 'T12:00:00');
      targetDateString = targetDate.toDateString();
    } else {
      targetDateString = new Date().toDateString();
    }
    
    const shawarmaData = getSheetData('DailyShawarmaStack');
    const salesData = getSheetData('DailySales');
    const rawProteinsData = getSheetData('DailyRawProteins');
    const marinatedProteinsData = getSheetData('DailyMarinatedProteins');
    const breadData = getSheetData('DailyBreadTracking');
    const highCostData = getSheetData('DailyHighCostItems');
    
    const todayShawarma = shawarmaData.find(row => {
      if (!row.date) return false;
      return new Date(row.date).toDateString() === targetDateString;
    });
    
    const todaySales = salesData.find(row => {
      if (!row.sales_date) return false;
      return new Date(row.sales_date).toDateString() === targetDateString;
    });
    
    const todayRawProteins = rawProteinsData.find(row => {
      if (!row.count_date) return false;
      return new Date(row.count_date).toDateString() === targetDateString;
    });
    
    const todayMarinatedProteins = marinatedProteinsData.find(row => {
      if (!row.count_date) return false;
      return new Date(row.count_date).toDateString() === targetDateString;
    });
    
    const todayBread = breadData.find(row => {
      if (!row.count_date) return false;
      return new Date(row.count_date).toDateString() === targetDateString;
    });
    
    const todayHighCost = highCostData.find(row => {
      if (!row.count_date) return false;
      return new Date(row.count_date).toDateString() === targetDateString;
    });
    
    const report = {
      date: targetDateString,
      dataFound: !!(todayShawarma || todaySales || todayRawProteins || todayBread || todayMarinatedProteins || todayHighCost),
      shawarma: todayShawarma || null,
      sales: todaySales || null,
      rawProteins: todayRawProteins || null,
      marinatedProteins: todayMarinatedProteins || null,
      bread: todayBread || null,
      highCostItems: todayHighCost || null,
      notes: ''
    };
    
    return JSON.stringify(report);
    
  } catch (error) {
    Logger.log('Error generating daily report: ' + error.toString());
    throw new Error('Failed to generate report: ' + error.message);
  }
}

// Helper function to get sheet data (EXACT from Employee Code.gs)
function getSheetData(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet || sheet.getLastRow() <= 1) {
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  return data.slice(1).map(row => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index];
    });
    return item;
  });
}

// Save Raw Proteins Data (EXACT from Employee Code.gs)
function saveRawProteinsData(entryData, entryDate, employeeId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rawProteinsSheet = ss.getSheetByName('DailyRawProteins');
  const rawData = entryData.rawProteins;
  
  const row = [
    Utilities.getUuid(), entryDate,
    parseFloat(rawData.frozen_chicken_breast_opening) || 0,
    parseFloat(rawData.frozen_chicken_breast_received) || 0,
    parseFloat(rawData.frozen_chicken_breast_expired) || 0,
    parseFloat(rawData.frozen_chicken_breast_remaining) || 0,
    parseFloat(rawData.chicken_shawarma_opening) || 0,
    parseFloat(rawData.chicken_shawarma_received) || 0,
    parseFloat(rawData.chicken_shawarma_expired) || 0,
    parseFloat(rawData.chicken_shawarma_remaining) || 0,
    parseFloat(rawData.steak_opening) || 0,
    parseFloat(rawData.steak_received) || 0,
    parseFloat(rawData.steak_expired) || 0,
    parseFloat(rawData.steak_remaining) || 0,
    employeeId, new Date(), new Date()
  ];
  
  rawProteinsSheet.appendRow(row);
}

// Save Marinated Proteins Data (EXACT from Employee Code.gs)
function saveMarinatedProteinsData(entryData, entryDate, employeeId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const marinatedSheet = ss.getSheetByName('DailyMarinatedProteins');
  const marinatedData = entryData.marinatedProteins;
  
  const row = [
    Utilities.getUuid(), entryDate,
    parseFloat(marinatedData.fahita_chicken_opening) || 0,
    parseFloat(marinatedData.fahita_chicken_received) || 0,
    parseFloat(marinatedData.fahita_chicken_expired) || 0,
    parseFloat(marinatedData.fahita_chicken_remaining) || 0,
    parseFloat(marinatedData.chicken_sub_opening) || 0,
    parseFloat(marinatedData.chicken_sub_received) || 0,
    parseFloat(marinatedData.chicken_sub_expired) || 0,
    parseFloat(marinatedData.chicken_sub_remaining) || 0,
    parseFloat(marinatedData.spicy_strips_opening) || 0,
    parseFloat(marinatedData.spicy_strips_received) || 0,
    parseFloat(marinatedData.spicy_strips_expired) || 0,
    parseFloat(marinatedData.spicy_strips_remaining) || 0,
    parseFloat(marinatedData.original_strips_opening) || 0,
    parseFloat(marinatedData.original_strips_received) || 0,
    parseFloat(marinatedData.original_strips_expired) || 0,
    parseFloat(marinatedData.original_strips_remaining) || 0,
    // ADD THESE NEW LINES FOR MARINATED STEAK:
      parseFloat(entryData.marinatedProteins.marinated_steak_opening) || 0,
      parseFloat(entryData.marinatedProteins.marinated_steak_received) || 0,
      parseFloat(entryData.marinatedProteins.marinated_steak_expired) || 0,
      parseFloat(entryData.marinatedProteins.marinated_steak_remaining) || 0,
    employeeId, new Date(), new Date()
  ];
  
  marinatedSheet.appendRow(row);
}

// Save Bread Data (EXACT from Employee Code.gs)
function saveBreadData(entryData, entryDate, employeeId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const breadSheet = ss.getSheetByName('DailyBreadTracking');
  const breadData = entryData.bread;
  
  const row = [
    Utilities.getUuid(), entryDate,
    parseInt(breadData.saj_bread_opening) || 0,
    parseInt(breadData.saj_bread_received) || 0,
    parseInt(breadData.saj_bread_expired) || 0,
    parseInt(breadData.saj_bread_remaining) || 0,
    parseInt(breadData.pita_bread_opening) || 0,
    parseInt(breadData.pita_bread_received) || 0,
    parseInt(breadData.pita_bread_expired) || 0,
    parseInt(breadData.pita_bread_remaining) || 0,
    parseInt(breadData.bread_rolls_opening) || 0,
    parseInt(breadData.bread_rolls_received) || 0,
    parseInt(breadData.bread_rolls_expired) || 0,
    parseInt(breadData.bread_rolls_remaining) || 0,
    employeeId, new Date(), new Date()
  ];
  
  breadSheet.appendRow(row);
}

// Save High Cost Items Data (EXACT from Employee Code.gs)
function saveHighCostItemsData(entryData, entryDate, employeeId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const highCostSheet = ss.getSheetByName('DailyHighCostItems');
  const highCostData = entryData.highCostItems;
  
  const row = [
    Utilities.getUuid(), entryDate,
    parseFloat(highCostData.cream_opening) || 0,
    parseFloat(highCostData.cream_received) || 0,
    parseFloat(highCostData.cream_expired) || 0,
    parseFloat(highCostData.cream_remaining) || 0,
    parseFloat(highCostData.mayo_opening) || 0,
    parseFloat(highCostData.mayo_received) || 0,
    parseFloat(highCostData.mayo_expired) || 0,
    parseFloat(highCostData.mayo_remaining) || 0,
    employeeId, new Date(), new Date()
  ];
  
  highCostSheet.appendRow(row);
}

function saveInventorySnapshot(entryData, entryDate, employeeId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const snapshotSheet = ss.getSheetByName('SnapshotLog');
  const itemSheet = ss.getSheetByName('Item');
  if (!snapshotSheet || !itemSheet) return;

  const itemData = itemSheet.getDataRange().getValues();
  if (itemData.length < 2) return;
  const headers = itemData[0];
  const idIndex = headers.indexOf('id');
  const nameIndex = headers.indexOf('name');
  const itemMap = {};
  for (let i = 1; i < itemData.length; i++) {
    const row = itemData[i];
    const id = row[idIndex];
    const name = row[nameIndex];
    if (id && name) {
      itemMap[String(name).toLowerCase()] = id;
    }
  }

  const rows = [];
  const addSnapshot = (label, qty) => {
    const itemId = itemMap[label.toLowerCase()];
    if (!itemId) return;
    rows.push([Utilities.getUuid(), itemId, entryDate, qty, '', employeeId, new Date(), new Date()]);
  };

  if (entryData.rawProteins) {
    const rp = entryData.rawProteins;
    addSnapshot('Frozen Chicken Breast', parseFloat(rp.frozen_chicken_breast_remaining) || 0);
    addSnapshot('Chicken Shawarma', parseFloat(rp.chicken_shawarma_remaining) || 0);
    addSnapshot('Steak', parseFloat(rp.steak_remaining) || 0);
  }

  if (entryData.marinatedProteins) {
    const mp = entryData.marinatedProteins;
    addSnapshot('Fahita Chicken', parseFloat(mp.fahita_chicken_remaining) || 0);
    addSnapshot('Chicken Sub', parseFloat(mp.chicken_sub_remaining) || 0);
    addSnapshot('Spicy Strips', parseFloat(mp.spicy_strips_remaining) || 0);
    addSnapshot('Original Strips', parseFloat(mp.original_strips_remaining) || 0);
    addSnapshot('Marinated Steak', parseFloat(mp.marinated_steak_remaining) || 0);
  }

  if (entryData.bread) {
    const b = entryData.bread;
    addSnapshot('Saj Bread', parseInt(b.saj_bread_remaining) || 0);
    addSnapshot('Pita Bread', parseInt(b.pita_bread_remaining) || 0);
    addSnapshot('Bread Rolls', parseInt(b.bread_rolls_remaining) || 0);
  }

  if (entryData.highCostItems) {
    const hc = entryData.highCostItems;
    addSnapshot('Cream', parseFloat(hc.cream_remaining) || 0);
    addSnapshot('Mayo', parseFloat(hc.mayo_remaining) || 0);
  }

  if (rows.length > 0) {
    snapshotSheet.getRange(snapshotSheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  }
}

// Save Sales Data with enhanced fields and petty cash details
function saveSalesData(entryData, entryDate, employeeId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const salesSheet = ss.getSheetByName('DailySales');
  const pettySheet = ss.getSheetByName('PettyCashDetail');
  const salesData = entryData.sales || {};

  const totalRevenue = parseFloat(salesData.total_revenue) || 0;
  const shawarmaRevenue = parseFloat(salesData.shawarma_revenue) || 0;
  const otherFoodRevenue = totalRevenue - shawarmaRevenue;
  const cashSales = parseFloat(salesData.cash_sales) || 0;
  const cardSales = parseFloat(salesData.card_sales) || 0;
  const delivery1 = parseFloat(salesData.delivery_aggregator_1) || 0;
  const delivery2 = parseFloat(salesData.delivery_aggregator_2) || 0;
  const pettyDetails = salesData.petty_cash_details || [];
  const pettyCashTotal = pettyDetails.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
  const notes = salesData.notes || '';

  const row = [
    Utilities.getUuid(), entryDate, totalRevenue, shawarmaRevenue, otherFoodRevenue, cashSales,
    cardSales, delivery1, delivery2, pettyCashTotal, notes, employeeId, new Date(), new Date()
  ];

  salesSheet.appendRow(row);

  const dailySalesId = row[0];
  if (pettyDetails.length > 0 && pettySheet) {
    const pettyRows = pettyDetails.map(detail => [
      Utilities.getUuid(),
      dailySalesId,
      detail.category || '',
      detail.description || '',
      parseFloat(detail.amount) || 0,
      detail.paid_by || '',
      employeeId,
      new Date(),
      new Date()
    ]);
    pettySheet.getRange(pettySheet.getLastRow() + 1, 1, pettyRows.length, pettyRows[0].length).setValues(pettyRows);
  }
}

// NEW: Get all data for management dashboard (enhanced version for management features)
function getData() {
  try {
    const data = {
      ingredients: getSheetData('Ingredients'),
      products: getSheetData('Products'),
      recipes: getSheetData('Recipes'),
      orders: getSheetData('Orders'),
      orderItems: getSheetData('OrderItems'),
      employees: getSheetData('Employees'),
      suppliers: getSheetData('Suppliers'),
      dailyShawarmaStack: getSheetData('DailyShawarmaStack'),
      dailySales: getSheetData('DailySales'),
      dailyRawProteins: getSheetData('DailyRawProteins'),
      dailyMarinatedProteins: getSheetData('DailyMarinatedProteins'),
      dailyBreadTracking: getSheetData('DailyBreadTracking'),
      dailyHighCostItems: getSheetData('DailyHighCostItems'),
      dailyInventoryCount: getSheetData('DailyInventoryCount'),
      dailyProductSales: getSheetData('DailyProductSales'),
      weeklyInventory: getSheetData('WeeklyInventory'),
      item: getSheetData('Item'),
      snapshotLog: getSheetData('SnapshotLog'),
      pettyCashDetail: getSheetData('PettyCashDetail')
    };
    return JSON.stringify(data);
  } catch (error) {
    Logger.log('Error getting data: ' + error.toString());
    throw new Error('Failed to retrieve data: ' + error.message);
  }
}
// Weekly Inventory Functions
function checkExistingWeeklyEntry(weekStartDate) {
  try {
    const data = getSheetData('WeeklyInventory');
    const target = new Date(weekStartDate).toDateString();
    const entries = data.filter(row => row.week_start_date && new Date(row.week_start_date).toDateString() === target);
    if (entries.length > 0) {
      return JSON.stringify({ exists: true, entries: entries, weekStart: target });
    }
    return JSON.stringify({ exists: false, weekStart: target });
  } catch (error) {
    Logger.log('Error checking weekly entry: ' + error.toString());
    throw new Error('Failed to check weekly entry: ' + error.message);
  }
}

function deleteExistingWeeklyEntries(weekStartDate) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('WeeklyInventory');
  if (!sheet) return;
  const target = new Date(weekStartDate).toDateString();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const index = headers.indexOf('week_start_date');
  if (index === -1) return;
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][index] && new Date(data[i][index]).toDateString() === target) {
      sheet.deleteRow(i + 1);
    }
  }
}

function saveWeeklyEntry(entryData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('WeeklyInventory');
    const weekStart = new Date(entryData.weekStartDate).toDateString();
    const weekEnd = entryData.weekEndDate;
    const employeeId = entryData.employeeId || 'unknown';

    if (entryData.isUpdate) {
      if (!entryData.managementPin || !validateManagementPin(entryData.managementPin)) {
        return JSON.stringify({ success: false, message: 'Invalid management PIN. Update not authorized.' });
      }
      deleteExistingWeeklyEntries(weekStart);
    }

    entryData.items.forEach(it => {
      const row = [
        Utilities.getUuid(),
        weekStart,
        weekEnd,
        it.category,
        it.name,
        parseFloat(it.opening) || 0,
        parseFloat(it.received) || 0,
        parseFloat(it.expired) || 0,
        parseFloat(it.remaining) || 0,
        it.unit,
        entryData.notes || '',
        employeeId,
        new Date(),
        new Date()
      ];
      sheet.appendRow(row);
    });

    const msg = entryData.isUpdate ? `Weekly entry for ${weekStart} updated successfully!` : `Weekly entry for ${weekStart} saved successfully!`;
    return JSON.stringify({ success: true, message: msg });
  } catch (error) {
    Logger.log('Error saving weekly entry: ' + error.toString());
    throw new Error('Failed to save weekly entry: ' + error.message);
  }
}

function generateWeeklyReport(date) {
  try {
    const weekStart = new Date(date).toDateString();
    const data = getSheetData('WeeklyInventory');
    const entries = data.filter(row => row.week_start_date && new Date(row.week_start_date).toDateString() === weekStart);
    const items = {};
    entries.forEach(r => {
      const key = r.item_name.toLowerCase().replace(/\s+/g, '_');
      items[key] = {
        opening_quantity: r.opening_quantity,
        received_quantity: r.received_quantity,
        expired_quantity: r.expired_quantity,
        remaining_quantity: r.remaining_quantity,
        unit: r.unit,
        category: r.category
      };
    });
    const notes = entries.length > 0 ? entries[0].notes : '';
    return JSON.stringify({ weekStart: weekStart, dataFound: entries.length > 0, items: items, notes: notes });
  } catch (error) {
    Logger.log('Error generating weekly report: ' + error.toString());
    throw new Error('Failed to generate weekly report: ' + error.message);
  }
}

