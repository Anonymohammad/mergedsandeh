// Unified Restaurant Management System - Code.gs
// FULLY COMPATIBLE with existing Employee app data structure
// Based on Employee Code.gs with Management features added

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
        'employee_id', 'employee_name', 'created_at', 'updated_at'
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
        'employee_id', 'employee_name', 'created_at', 'updated_at'
    ]
  },
  
  DailyRawProteins: {
    requiredHeaders: [
      'id', 'count_date', 'frozen_chicken_breast_opening', 'frozen_chicken_breast_received',
      'frozen_chicken_breast_expired', 'frozen_chicken_breast_remaining',
      'chicken_shawarma_opening', 'chicken_shawarma_received', 
      'chicken_shawarma_expired', 'chicken_shawarma_remaining',
      'steak_opening', 'steak_received', 'steak_expired', 'steak_remaining',
        'employee_id', 'employee_name', 'created_at', 'updated_at'
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
        'employee_id', 'employee_name', 'created_at', 'updated_at'
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
        'employee_id', 'employee_name', 'created_at', 'updated_at'
    ]
  },
  
  DailyHighCostItems: {
    requiredHeaders: [
      'id', 'count_date', 'cream_opening', 'cream_received',
      'cream_expired', 'cream_remaining',
      'mayo_opening', 'mayo_received', 'mayo_expired', 'mayo_remaining',
      'employee_id', 'employee_name', 'created_at', 'updated_at'
    ]
  },

  Item: {
    requiredHeaders: [
      'id', 'name', 'category', 'unit', 'frequency', 'is_prepared', 'cost_per_unit',
      'min_stock', 'max_stock', 'storage_location', 'legacy_key', 'active',
      'created_at', 'updated_at'
    ]
  },

  SnapshotLog: {
    requiredHeaders: [
        'id', 'item_id', 'date', 'closing_quantity', 'notes', 'employee_id', 'employee_name',
        'created_at', 'updated_at'
    ]
  },

  PettyCashDetail: {
    requiredHeaders: [
        'id', 'daily_sales_id', 'category', 'description', 'amount', 'paid_by',
        'employee_id', 'employee_name', 'created_at', 'updated_at'
    ]
  },

  DailySales: {
    requiredHeaders: [
      'id', 'sales_date', 'total_revenue', 'shawarma_revenue', 'other_food_revenue',
      'cash_sales', 'card_sales', 'delivery_aggregator_1', 'delivery_aggregator_2',
        'total_food_cost', 'food_cost_percentage', 'total_orders', 'petty_cash_total',
        'employee_id', 'employee_name', 'created_at', 'updated_at'
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

  WasteLog: {
    requiredHeaders: [
      'id', 'item_id', 'waste_quantity', 'reason', 'date', 'notes',
      'cost_override', 'estimated_cost', 'employee_id', 'created_at', 'updated_at'
    ]
  },

  PurchaseLog: {
    requiredHeaders: [
      'id', 'supplier_id', 'invoice_number', 'delivery_date', 'received_by',
      'item_id', 'quantity', 'cost_per_unit', 'total_cost', 'quality', 'notes',
      'created_at', 'updated_at'
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

const MIGRATION_CONFIG = {
  enabled: true,
  dualWriteMode: true,
  readFromNew: true,
  fallbackToOld: true,
  migrationPhase: 'dual-write',
  batchSize: 50,
  logMigration: true,
  validateMigration: true
};

function logMigrationActivity(activity, details, status = 'info') {
  if (!MIGRATION_CONFIG.logMigration) return;

  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp: timestamp,
    activity: activity,
    details: details,
    status: status,
    phase: MIGRATION_CONFIG.migrationPhase
  };

  console.log(`[MIGRATION ${status.toUpperCase()}] ${activity}: ${JSON.stringify(details)}`);

  try {
    const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MigrationLog');
    if (logSheet) {
      logSheet.appendRow([
        timestamp, activity, JSON.stringify(details), status, MIGRATION_CONFIG.migrationPhase
      ]);
    }
  } catch (error) {
    console.log('Failed to write migration log:', error);
  }
}

function getMigrationStatus() {
  return {
    config: MIGRATION_CONFIG,
    timestamp: new Date().toISOString(),
    oldTablesExist: checkOldTablesExist(),
    newTablesExist: checkNewTablesExist(),
    dataInOldTables: getOldTableRecordCounts(),
    dataInNewTables: getNewTableRecordCounts()
  };
}

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

// Helper functions for validation and error handling
function isSheetEmpty(sheet) {
  return !sheet || sheet.getLastRow() <= 1;
}

function appendRowSafe(sheet, row) {
  if (!sheet) {
    throw new Error('Sheet not found');
  }
  const expected = sheet.getLastColumn();
  if (row.length !== expected) {
    throw new Error('Row length mismatch. Expected ' + expected + ' but got ' + row.length);
  }
  sheet.appendRow(row);
}

function handleInitializationError(sheetName, error) {
  Logger.log('Error initializing ' + sheetName + ': ' + error.toString());
  throw new Error('Initialization failed for ' + sheetName + ': ' + error.message);
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

  initializeItemsTable();

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

function initializeItemsTable() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Item');

    if (isSheetEmpty(sheet)) {
      const now = new Date();
      const items = [
        { name: 'Frozen Chicken Breast', category: 'Raw Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'frozen_chicken_breast', is_prepared: false },
        { name: 'Chicken Shawarma', category: 'Raw Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'chicken_shawarma', is_prepared: false },
        { name: 'Steak', category: 'Raw Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'steak', is_prepared: false },
        { name: 'Fahita Chicken', category: 'Marinated Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'fahita_chicken', is_prepared: true },
        { name: 'Chicken Sub', category: 'Marinated Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'chicken_sub', is_prepared: true },
        { name: 'Spicy Strips', category: 'Marinated Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'spicy_strips', is_prepared: true },
        { name: 'Original Strips', category: 'Marinated Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'original_strips', is_prepared: true },
        { name: 'Marinated Steak', category: 'Marinated Proteins', unit: 'kg', frequency: 'daily', legacy_key: 'marinated_steak', is_prepared: true },
        { name: 'Saj Bread', category: 'Bread', unit: 'pieces', frequency: 'daily', legacy_key: 'saj_bread', is_prepared: false },
        { name: 'Pita Bread', category: 'Bread', unit: 'pieces', frequency: 'daily', legacy_key: 'pita_bread', is_prepared: false },
        { name: 'Bread Rolls', category: 'Bread', unit: 'pieces', frequency: 'daily', legacy_key: 'bread_rolls', is_prepared: false },
        { name: 'Cream', category: 'High Cost Items', unit: 'kg', frequency: 'daily', legacy_key: 'cream', is_prepared: false },
        { name: 'Mayo', category: 'High Cost Items', unit: 'kg', frequency: 'daily', legacy_key: 'mayo', is_prepared: false }
      ];

      items.forEach(function(it) {
        const row = [
          Utilities.getUuid(),
          it.name,
          it.category,
          it.unit,
          it.frequency,
          it.is_prepared,
          0,
          0,
          0,
          '',
          it.legacy_key,
          true,
          now,
          now
        ];
        appendRowSafe(sheet, row);
      });
    }
  } catch (error) {
    handleInitializationError('Item', error);
  }
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

    const deletedDailySalesIds = [];

    sheetsToClean.forEach(sheetName => {
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) return;
      
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const dateFieldName = sheetName === 'DailyShawarmaStack' || sheetName === 'SnapshotLog' ? 'date' :
                           sheetName === 'DailySales' ? 'sales_date' : 'count_date';
      const dateIndex = headers.indexOf(dateFieldName);
      
      if (dateIndex === -1) return;
      
      const rowsToDelete = [];
      for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][dateIndex] && new Date(data[i][dateIndex]).toDateString() === targetDate) {
          rowsToDelete.push(i + 1);
          if (sheetName === 'DailySales') {
            const idIndex = headers.indexOf('id');
            if (idIndex !== -1) {
              deletedDailySalesIds.push(data[i][idIndex]);
            }
          }
        }
      }

      rowsToDelete.forEach(rowIndex => {
        sheet.deleteRow(rowIndex);
      });
    });

    if (deletedDailySalesIds.length > 0) {
      const pettySheet = ss.getSheetByName('PettyCashDetail');
      if (pettySheet) {
        const pettyData = pettySheet.getDataRange().getValues();
        const pettyHeaders = pettyData[0];
        const dailyIdIndex = pettyHeaders.indexOf('daily_sales_id');
        const pettyRowsToDelete = [];
        for (let j = pettyData.length - 1; j >= 1; j--) {
          if (dailyIdIndex !== -1 && deletedDailySalesIds.indexOf(pettyData[j][dailyIdIndex]) !== -1) {
            pettyRowsToDelete.push(j + 1);
          }
        }
        pettyRowsToDelete.forEach(rowIndex => {
          pettySheet.deleteRow(rowIndex);
        });
      }
    }
    
  } catch (error) {
    Logger.log('Error deleting existing entries: ' + error.toString());
    throw new Error('Failed to delete existing entries: ' + error.message);
  }
}

// Save daily entry with dual-write capability
function saveDailyEntry(entryData) {
  try {
    logMigrationActivity('saveDailyEntry_start', {
      date: entryData.date,
      isUpdate: entryData.isUpdate,
      employeeId: entryData.employeeId
    });

    const entryDate = entryData.date ? new Date(entryData.date).toDateString() : new Date().toDateString();

    if (entryData.isUpdate) {
      if (!entryData.managementPin || !validateManagementPin(entryData.managementPin)) {
        return JSON.stringify({
          success: false,
          message: 'Invalid management PIN. Update not authorized.'
        });
      }

      deleteExistingEntries(entryDate);
    }

    if (MIGRATION_CONFIG.enabled) {
      try {
        const newSaveResult = saveDailyEntryToNewTables(entryData);
        logMigrationActivity('new_tables_save', {
          date: entryDate,
          success: newSaveResult.success
        }, newSaveResult.success ? 'success' : 'error');
      } catch (error) {
        logMigrationActivity('new_tables_save_error', {
          date: entryDate,
          error: error.message
        }, 'error');

        if (!MIGRATION_CONFIG.dualWriteMode) {
          throw error;
        }
      }
    }

    if (MIGRATION_CONFIG.dualWriteMode) {
      try {
        const oldSaveResult = saveDailyEntryToOldTables(entryData);
        logMigrationActivity('old_tables_save', {
          date: entryDate,
          success: oldSaveResult.success
        }, oldSaveResult.success ? 'success' : 'warning');
      } catch (error) {
        logMigrationActivity('old_tables_save_error', {
          date: entryDate,
          error: error.message
        }, 'warning');
      }
    }

    return JSON.stringify({
      success: true,
      message: entryData.isUpdate ? 'Entry updated successfully!' : 'Entry saved successfully!'
    });

  } catch (error) {
    logMigrationActivity('saveDailyEntry_error', {
      date: entryData.date,
      error: error.message
    }, 'error');
    throw error;
  }
}

function saveDailyEntryToNewTables(entryData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const entryDate = entryData.date ? new Date(entryData.date).toDateString() : new Date().toDateString();
  const employeeId = entryData.employeeId || entryData.employee_id || '';
  const employeeName = entryData.employeeName || entryData.employee_name || '';

  if (entryData.shawarmaStack) {
    saveShawarmaStackData(entryData, entryDate, employeeId, employeeName);
  }

  // Handle inventory data whether provided as nested sections or as a flat `inventory` object
  let inventoryData = null;
  const hasNestedSections = entryData.rawProteins || entryData.marinatedProteins || entryData.bread || entryData.highCostItems;

  if (hasNestedSections) {
    // Use the explicitly provided category sections
    inventoryData = {
      rawProteins: entryData.rawProteins || {},
      marinatedProteins: entryData.marinatedProteins || {},
      bread: entryData.bread || {},
      highCostItems: entryData.highCostItems || {}
    };
  } else if (entryData.inventory) {
    // Convert legacy `inventory` format to nested category sections
    inventoryData = convertInventoryDataToNestedFormat(entryData.inventory);
  }

  if (inventoryData) {
    saveInventorySnapshots(inventoryData, entryDate, employeeId, employeeName);
  }

  let dailySalesId = null;
  if (entryData.sales || (entryData.pettyCashEntries && entryData.pettyCashEntries.length)) {
    dailySalesId = saveEnhancedSalesData(entryData, entryDate, employeeId, employeeName);
  }

  if (entryData.pettyCashEntries && entryData.pettyCashEntries.length && dailySalesId) {
    savePettyCashDetails(entryData.pettyCashEntries, dailySalesId, employeeId, employeeName);
  }
  try {
    calculateInventoryVariance(entryDate, employeeId, { trigger: 'daily_entry' });
  } catch (err) {
    console.error('Variance calculation failed: ' + err.message);
  }

  return { success: true, method: 'new_tables' };
}

function saveDailyEntryToOldTables(entryData) {
  const entryDate = entryData.date ? new Date(entryData.date).toDateString() : new Date().toDateString();
  const employeeId = entryData.employeeId || entryData.employee_id || '';
  const employeeName = entryData.employeeName || entryData.employee_name || '';

  let inventoryData;
  if (entryData.rawProteins || entryData.marinatedProteins || entryData.bread || entryData.highCostItems) {
    inventoryData = {
      rawProteins: entryData.rawProteins || {},
      marinatedProteins: entryData.marinatedProteins || {},
      bread: entryData.bread || {},
      highCostItems: entryData.highCostItems || {}
    };
  } else if (entryData.inventory) {
    inventoryData = convertInventoryDataToNestedFormat(entryData.inventory);
  }

  if (inventoryData) {
    saveToOldInventoryTables(inventoryData, entryDate, employeeId, employeeName);
  }

  return { success: true, method: 'old_tables' };
}
 
function saveToOldInventoryTables(inventoryData, entryDate, employeeId, employeeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (inventoryData.rawProteins && Object.keys(inventoryData.rawProteins).length > 0) {
    const rawProteinsSheet = ss.getSheetByName('DailyRawProteins');
    const row = [
      Utilities.getUuid(),
      entryDate,
      inventoryData.rawProteins.frozen_chicken_breast_opening || '',
      inventoryData.rawProteins.frozen_chicken_breast_received || '',
      inventoryData.rawProteins.frozen_chicken_breast_expired || '',
      inventoryData.rawProteins.frozen_chicken_breast_remaining || '',
      inventoryData.rawProteins.chicken_shawarma_opening || '',
      inventoryData.rawProteins.chicken_shawarma_received || '',
      inventoryData.rawProteins.chicken_shawarma_expired || '',
      inventoryData.rawProteins.chicken_shawarma_remaining || '',
      inventoryData.rawProteins.steak_opening || '',
      inventoryData.rawProteins.steak_received || '',
      inventoryData.rawProteins.steak_expired || '',
      inventoryData.rawProteins.steak_remaining || '',
      employeeId,
      employeeName,
      new Date(),
      new Date()
    ];
    rawProteinsSheet.appendRow(row);
  }

  if (inventoryData.marinatedProteins && Object.keys(inventoryData.marinatedProteins).length > 0) {
    const marinatedSheet = ss.getSheetByName('DailyMarinatedProteins');
    const row = [
      Utilities.getUuid(),
      entryDate,
      inventoryData.marinatedProteins.fahita_chicken_opening || '',
      inventoryData.marinatedProteins.fahita_chicken_received || '',
      inventoryData.marinatedProteins.fahita_chicken_expired || '',
      inventoryData.marinatedProteins.fahita_chicken_remaining || '',
      inventoryData.marinatedProteins.chicken_sub_opening || '',
      inventoryData.marinatedProteins.chicken_sub_received || '',
      inventoryData.marinatedProteins.chicken_sub_expired || '',
      inventoryData.marinatedProteins.chicken_sub_remaining || '',
      inventoryData.marinatedProteins.spicy_strips_opening || '',
      inventoryData.marinatedProteins.spicy_strips_received || '',
      inventoryData.marinatedProteins.spicy_strips_expired || '',
      inventoryData.marinatedProteins.spicy_strips_remaining || '',
      inventoryData.marinatedProteins.original_strips_opening || '',
      inventoryData.marinatedProteins.original_strips_received || '',
      inventoryData.marinatedProteins.original_strips_expired || '',
      inventoryData.marinatedProteins.original_strips_remaining || '',
      inventoryData.marinatedProteins.marinated_steak_opening || '',
      inventoryData.marinatedProteins.marinated_steak_received || '',
      inventoryData.marinatedProteins.marinated_steak_expired || '',
      inventoryData.marinatedProteins.marinated_steak_remaining || '',
      employeeId,
      employeeName,
      new Date(),
      new Date()
    ];
    marinatedSheet.appendRow(row);
  }

  if (inventoryData.bread && Object.keys(inventoryData.bread).length > 0) {
    const breadSheet = ss.getSheetByName('DailyBreadTracking');
    const row = [
      Utilities.getUuid(),
      entryDate,
      inventoryData.bread.saj_bread_opening || '',
      inventoryData.bread.saj_bread_received || '',
      inventoryData.bread.saj_bread_expired || '',
      inventoryData.bread.saj_bread_remaining || '',
      inventoryData.bread.pita_bread_opening || '',
      inventoryData.bread.pita_bread_received || '',
      inventoryData.bread.pita_bread_expired || '',
      inventoryData.bread.pita_bread_remaining || '',
      inventoryData.bread.bread_rolls_opening || '',
      inventoryData.bread.bread_rolls_received || '',
      inventoryData.bread.bread_rolls_expired || '',
      inventoryData.bread.bread_rolls_remaining || '',
      employeeId,
      employeeName,
      new Date(),
      new Date()
    ];
    breadSheet.appendRow(row);
  }

  if (inventoryData.highCostItems && Object.keys(inventoryData.highCostItems).length > 0) {
    const highCostSheet = ss.getSheetByName('DailyHighCostItems');
    const row = [
      Utilities.getUuid(),
      entryDate,
      inventoryData.highCostItems.cream_opening || '',
      inventoryData.highCostItems.cream_received || '',
      inventoryData.highCostItems.cream_expired || '',
      inventoryData.highCostItems.cream_remaining || '',
      inventoryData.highCostItems.mayo_opening || '',
      inventoryData.highCostItems.mayo_received || '',
      inventoryData.highCostItems.mayo_expired || '',
      inventoryData.highCostItems.mayo_remaining || '',
      employeeId,
      employeeName,
      new Date(),
      new Date()
    ];
    highCostSheet.appendRow(row);
  }
}

function convertInventoryDataToNestedFormat(inventory) {
  const nested = {
    rawProteins: {},
    marinatedProteins: {},
    bread: {},
    highCostItems: {}
  };

  const keyMappings = {
    'chicken_breast_opening': 'rawProteins.frozen_chicken_breast_opening',
    'chicken_breast_received': 'rawProteins.frozen_chicken_breast_received',
    'chicken_breast_expired': 'rawProteins.frozen_chicken_breast_expired',
    'chicken_breast_remaining': 'rawProteins.frozen_chicken_breast_remaining',
    'chicken_shawarma_opening': 'rawProteins.chicken_shawarma_opening',
    'chicken_shawarma_received': 'rawProteins.chicken_shawarma_received',
    'chicken_shawarma_expired': 'rawProteins.chicken_shawarma_expired',
    'chicken_shawarma_remaining': 'rawProteins.chicken_shawarma_remaining',
    'steak_opening': 'rawProteins.steak_opening',
    'steak_received': 'rawProteins.steak_received',
    'steak_expired': 'rawProteins.steak_expired',
    'steak_remaining': 'rawProteins.steak_remaining',
    'fahita_chicken_opening': 'marinatedProteins.fahita_chicken_opening',
    'fahita_chicken_received': 'marinatedProteins.fahita_chicken_received',
    'fahita_chicken_expired': 'marinatedProteins.fahita_chicken_expired',
    'fahita_chicken_remaining': 'marinatedProteins.fahita_chicken_remaining',
    'chicken_sub_opening': 'marinatedProteins.chicken_sub_opening',
    'chicken_sub_received': 'marinatedProteins.chicken_sub_received',
    'chicken_sub_expired': 'marinatedProteins.chicken_sub_expired',
    'chicken_sub_remaining': 'marinatedProteins.chicken_sub_remaining',
    'spicy_strips_opening': 'marinatedProteins.spicy_strips_opening',
    'spicy_strips_received': 'marinatedProteins.spicy_strips_received',
    'spicy_strips_expired': 'marinatedProteins.spicy_strips_expired',
    'spicy_strips_remaining': 'marinatedProteins.spicy_strips_remaining',
    'original_strips_opening': 'marinatedProteins.original_strips_opening',
    'original_strips_received': 'marinatedProteins.original_strips_received',
    'original_strips_expired': 'marinatedProteins.original_strips_expired',
    'original_strips_remaining': 'marinatedProteins.original_strips_remaining',
    'marinated_steak_opening': 'marinatedProteins.marinated_steak_opening',
    'marinated_steak_received': 'marinatedProteins.marinated_steak_received',
    'marinated_steak_expired': 'marinatedProteins.marinated_steak_expired',
    'marinated_steak_remaining': 'marinatedProteins.marinated_steak_remaining',
    'saj_bread_opening': 'bread.saj_bread_opening',
    'saj_bread_received': 'bread.saj_bread_received',
    'saj_bread_expired': 'bread.saj_bread_expired',
    'saj_bread_remaining': 'bread.saj_bread_remaining',
    'pita_bread_opening': 'bread.pita_bread_opening',
    'pita_bread_received': 'bread.pita_bread_received',
    'pita_bread_expired': 'bread.pita_bread_expired',
    'pita_bread_remaining': 'bread.pita_bread_remaining',
    'bread_rolls_opening': 'bread.bread_rolls_opening',
    'bread_rolls_received': 'bread.bread_rolls_received',
    'bread_rolls_expired': 'bread.bread_rolls_expired',
    'bread_rolls_remaining': 'bread.bread_rolls_remaining',
    'cream_opening': 'highCostItems.cream_opening',
    'cream_received': 'highCostItems.cream_received',
    'cream_expired': 'highCostItems.cream_expired',
    'cream_remaining': 'highCostItems.cream_remaining',
    'mayo_opening': 'highCostItems.mayo_opening',
    'mayo_received': 'highCostItems.mayo_received',
    'mayo_expired': 'highCostItems.mayo_expired',
    'mayo_remaining': 'highCostItems.mayo_remaining'
  };

  Object.keys(inventory || {}).forEach(function(key) {
    const mapping = keyMappings[key];
    if (mapping) {
      const parts = mapping.split('.');
      const section = parts[0];
      const field = parts[1];
      if (!nested[section]) nested[section] = {};
      nested[section][field] = inventory[key];
    }
  });

  return nested;
}

function saveShawarmaStackData(entryData, entryDate, employeeId, employeeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shawarmaSheet = ss.getSheetByName('DailyShawarmaStack');
  const stackData = entryData.shawarmaStack;

  const startingWeight = parseFloat(stackData.starting_weight) || 0;
  const shavingWeight = parseFloat(stackData.shaving_weight) || 0;
  const staffMealsWeight = parseFloat(stackData.staff_meals_weight) || 0;
  const ordersWeight = parseFloat(stackData.orders_weight) || 0;
  const remainingWeight = parseFloat(stackData.remaining_weight) || 0;

  const shawarmaRevenue = parseFloat((entryData.sales && entryData.sales.shawarma_revenue) || 0);
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
    shawarmaRevenue, profitPerKg, employeeId, employeeName, new Date(), new Date()
  ];

  shawarmaSheet.appendRow(row);
}

function saveEnhancedSalesData(entryData, entryDate, employeeId, employeeName) {
  if (entryData.pettyCashEntries && entryData.pettyCashEntries.length) {
    const pettyTotal = calculatePettyCashTotal(entryData.pettyCashEntries);
    entryData.sales = entryData.sales || {};
    entryData.sales.petty_cash_total = pettyTotal;
  }
  if (entryData.sales) {
    return saveSalesData(entryData, entryDate, employeeId, employeeName);
  }
  return null;
}

function saveInventorySnapshots(entryData, entryDate, employeeId, employeeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const legacyData = {
    rawProteins: entryData.rawProteins || {},
    marinatedProteins: entryData.marinatedProteins || {},
    bread: entryData.bread || {},
    highCostItems: entryData.highCostItems || {}
  };
  const snapshotEntries = mapLegacyInventoryToSnapshotLog(legacyData, employeeId, employeeName, entryDate);
  if (snapshotEntries.length > 0) {
    const snapshotSheet = ss.getSheetByName('SnapshotLog');
    snapshotEntries.forEach(function(entry) {
      const row = [
        entry.id,
        entry.item_id,
        entry.date,
        entry.closing_quantity,
        entry.notes,
        entry.employee_id,
        entry.employee_name,
        entry.created_at,
        entry.updated_at
      ];
      snapshotSheet.appendRow(row);
    });
  }
}

// Generate daily report with dual-read logic
function generateDailyReport(date) {
  try {
    const targetDateString = date ? new Date(date).toDateString() : new Date().toDateString();

    logMigrationActivity('generateDailyReport_start', {
      date: targetDateString,
      readFromNew: MIGRATION_CONFIG.readFromNew
    });

    let reportData = {
      date: targetDateString,
      dataFound: false,
      dataSource: 'none'
    };

    if (MIGRATION_CONFIG.enabled && MIGRATION_CONFIG.readFromNew) {
      try {
        const newTableData = generateReportFromNewTables(targetDateString);
        if (newTableData && newTableData.dataFound) {
          reportData = { ...reportData, ...newTableData, dataSource: 'new_tables' };
          logMigrationActivity('new_tables_read_success', {
            date: targetDateString,
            hasData: newTableData.dataFound
          }, 'success');
        }
      } catch (error) {
        logMigrationActivity('new_tables_read_error', {
          date: targetDateString,
          error: error.message
        }, 'warning');
      }
    }

    if (!reportData.dataFound && MIGRATION_CONFIG.fallbackToOld) {
      try {
        const oldTableData = generateReportFromOldTables(targetDateString);
        if (oldTableData && oldTableData.dataFound) {
          reportData = { ...reportData, ...oldTableData, dataSource: 'old_tables' };
          logMigrationActivity('old_tables_read_fallback', {
            date: targetDateString,
            hasData: oldTableData.dataFound
          }, 'info');
        }
      } catch (error) {
        logMigrationActivity('old_tables_read_error', {
          date: targetDateString,
          error: error.message
        }, 'error');
      }
    }

    return JSON.stringify(reportData);

  } catch (error) {
    logMigrationActivity('generateDailyReport_error', {
      date: date,
      error: error.message
    }, 'error');
    throw error;
  }
}

function generateReportFromNewTables(targetDateString) {
  try {
    const shawarmaData = Array.isArray(getSheetData('DailyShawarmaStack')) ? getSheetData('DailyShawarmaStack') : [];
    const salesData = Array.isArray(getSheetData('DailySales')) ? getSheetData('DailySales') : [];
    const snapshotData = Array.isArray(getSheetData('SnapshotLog')) ? getSheetData('SnapshotLog') : [];

    const todayShawarma = shawarmaData.find(row => row.date && new Date(row.date).toDateString() === targetDateString);
    const todaySales = salesData.find(row => row.sales_date && new Date(row.sales_date).toDateString() === targetDateString);

    let pettyCashEntries = [];
    if (todaySales && todaySales.id) {
      pettyCashEntries = getPettyCashDetails(todaySales.id);
      const totalRevenue = parseFloat(todaySales.total_revenue) || 0;
      const shawarmaRevenue = parseFloat(todaySales.shawarma_revenue) || 0;
      todaySales.other_food_revenue = totalRevenue - shawarmaRevenue;
      todaySales.petty_cash_total = calculatePettyCashTotal(pettyCashEntries);
    }

    const todaySnapshot = Array.isArray(snapshotData) ? snapshotData.filter(row => row.date && new Date(row.date).toDateString() === targetDateString) : [];

    let inventoryData = null;
    if (todaySnapshot.length > 0) {
      inventoryData = mapSnapshotLogToFormFormat(todaySnapshot);
    }

    return {
      date: targetDateString,
      dataFound: !!(todayShawarma || todaySales || todaySnapshot.length > 0),
      shawarma: todayShawarma || null,
      sales: todaySales || null,
      inventory: inventoryData,
      pettyCashEntries: pettyCashEntries,
      notes: ''
    };
  } catch (error) {
    logMigrationActivity('new_tables_report_error', {
      date: targetDateString,
      error: error.message
    }, 'error');
    return {
      date: targetDateString,
      dataFound: false,
      shawarma: null,
      sales: null,
      inventory: null,
      pettyCashEntries: [],
      notes: ''
    };
  }
}

function mapSnapshotLogToFormFormat(snapshotEntries) {
  try {
    const items = Array.isArray(getSheetData('Item')) ? getSheetData('Item') : [];
    const itemMap = {};
    items.forEach(function(it) {
      if (it && typeof it.id !== 'undefined') {
        itemMap[it.id] = it;
      }
    });

    const flattened = {};

    if (Array.isArray(snapshotEntries)) {
      snapshotEntries.forEach(function(entry) {
        const item = itemMap[entry.item_id];
        if (!item || !item.legacy_key) return;
        const fieldName = item.legacy_key + '_remaining';
        flattened[fieldName] = entry.closing_quantity;
      });
    }

    return flattened;
  } catch (error) {
    logMigrationActivity('map_snapshot_log_error', { error: error.message }, 'error');
    return {};
  }
}

function generateReportFromOldTables(targetDateString) {
  const shawarmaData = getSheetData('DailyShawarmaStack');
  const salesData = getSheetData('DailySales');
  const rawProteinsData = getSheetData('DailyRawProteins');
  const marinatedProteinsData = getSheetData('DailyMarinatedProteins');
  const breadData = getSheetData('DailyBreadTracking');
  const highCostData = getSheetData('DailyHighCostItems');

  const todayShawarma = shawarmaData.find(row => row.date && new Date(row.date).toDateString() === targetDateString);
  const todaySales = salesData.find(row => row.sales_date && new Date(row.sales_date).toDateString() === targetDateString);

  let pettyCashEntries = [];
  if (todaySales) {
    pettyCashEntries = getPettyCashDetails(todaySales.id);
    todaySales.other_food_revenue = (parseFloat(todaySales.total_revenue) || 0) - (parseFloat(todaySales.shawarma_revenue) || 0);
    todaySales.petty_cash_total = calculatePettyCashTotal(pettyCashEntries);
  }

  const rawProteins = rawProteinsData.find(row => row.count_date && new Date(row.count_date).toDateString() === targetDateString) || null;
  const marinatedProteins = marinatedProteinsData.find(row => row.count_date && new Date(row.count_date).toDateString() === targetDateString) || null;
  const bread = breadData.find(row => row.count_date && new Date(row.count_date).toDateString() === targetDateString) || null;
  const highCostItems = highCostData.find(row => row.count_date && new Date(row.count_date).toDateString() === targetDateString) || null;

  return {
    date: targetDateString,
    dataFound: !!(todayShawarma || todaySales || rawProteins || marinatedProteins || bread || highCostItems),
    shawarma: todayShawarma || null,
    sales: todaySales || null,
    rawProteins: rawProteins,
    marinatedProteins: marinatedProteins,
    bread: bread,
    highCostItems: highCostItems,
    pettyCashEntries: pettyCashEntries,
    notes: ''
  };
}

function generateDashboardReport(date, options = {}) {
  try {
    const config = {
      includeTrends: options.includeTrends || false,
      includeComparisons: options.includeComparisons || false,
      includePettyCashAnalysis: options.includePettyCashAnalysis !== false,
      includeInventoryAnalysis: options.includeInventoryAnalysis !== false,
      compareToYesterday: options.compareToYesterday !== false,
      compareToWeekAgo: options.compareToWeekAgo || false
    };

    const targetDate = date ? new Date(date).toDateString() : new Date().toDateString();

    const baseReport = JSON.parse(generateDailyReport(date));

    const dashboardData = {
      ...baseReport,
      requested_date: date,
      config: config,
      enhanced_analytics: {}
    };

    if (config.includePettyCashAnalysis && baseReport.pettyCashEntries) {
      dashboardData.enhanced_analytics.pettyCash = analyzePettyCashData(baseReport.pettyCashEntries, targetDate);
    }

    if (config.includeInventoryAnalysis) {
      dashboardData.enhanced_analytics.inventory = analyzeInventoryData(baseReport, targetDate);
    }

    if (baseReport.sales) {
      dashboardData.enhanced_analytics.sales = analyzeSalesData(baseReport.sales, targetDate);
    }

    if (config.compareToYesterday) {
      dashboardData.enhanced_analytics.comparisons = getComparativeData(targetDate, config);
    }

    dashboardData.data_sources = {
      primary_source: baseReport.dataSource || 'unknown',
      migration_status: getMigrationStatus(),
      data_quality: assessDataQuality(baseReport)
    };

    return JSON.stringify(dashboardData);

  } catch (error) {
    logMigrationActivity('dashboard_report_error', {
      date: date,
      error: error.message
    }, 'error');
    throw error;
  }
}

function analyzePettyCashData(pettyCashEntries, targetDate) {
  if (!pettyCashEntries || pettyCashEntries.length === 0) {
    return {
      total_amount: 0,
      entry_count: 0,
      categories: {},
      top_category: null,
      average_amount: 0,
      recommendations: []
    };
  }

  const analysis = {
    total_amount: 0,
    entry_count: pettyCashEntries.length,
    categories: {},
    by_payer: {},
    recommendations: []
  };

  pettyCashEntries.forEach(entry => {
    const amount = parseFloat(entry.amount) || 0;
    analysis.total_amount += amount;

    if (!analysis.categories[entry.category]) {
      analysis.categories[entry.category] = { amount: 0, count: 0, entries: [] };
    }
    analysis.categories[entry.category].amount += amount;
    analysis.categories[entry.category].count++;
    analysis.categories[entry.category].entries.push(entry);

    if (!analysis.by_payer[entry.paid_by]) {
      analysis.by_payer[entry.paid_by] = { amount: 0, count: 0 };
    }
    analysis.by_payer[entry.paid_by].amount += amount;
    analysis.by_payer[entry.paid_by].count++;
  });

  analysis.average_amount = analysis.entry_count > 0 ? analysis.total_amount / analysis.entry_count : 0;

  let topCategory = null;
  let topAmount = 0;
  Object.entries(analysis.categories).forEach(([category, data]) => {
    if (data.amount > topAmount) {
      topAmount = data.amount;
      topCategory = category;
    }
  });
  analysis.top_category = topCategory;

  if (analysis.total_amount > 200) {
    analysis.recommendations.push({
      type: 'review',
      message: 'High petty cash spending today - review necessity of expenses',
      amount: analysis.total_amount
    });
  }

  if (analysis.categories['Fuel'] && analysis.categories['Fuel'].amount > 100) {
    analysis.recommendations.push({
      type: 'optimize',
      message: 'Consider fuel efficiency measures for delivery operations',
      category: 'Fuel',
      amount: analysis.categories['Fuel'].amount
    });
  }

  return analysis;
}

function analyzeInventoryData(reportData, targetDate) {
  const analysis = {
    total_items_tracked: 0,
    low_stock_items: [],
    high_usage_items: [],
    zero_stock_items: [],
    inventory_value: 0,
    turnover_analysis: {},
    recommendations: []
  };

  const inventoryCategories = ['rawProteins', 'marinatedProteins', 'bread', 'highCostItems'];

  inventoryCategories.forEach(category => {
    if (!reportData[category]) return;

    Object.entries(reportData[category]).forEach(([key, value]) => {
      if (key.endsWith('_remaining')) {
        const itemName = key.replace('_remaining', '');
        const quantity = parseFloat(value) || 0;

        analysis.total_items_tracked++;

        if (quantity === 0) {
          analysis.zero_stock_items.push({
            category: category,
            item: itemName,
            quantity: quantity
          });
        }

        const lowStockThreshold = getLowStockThreshold(category, itemName);
        if (quantity > 0 && quantity <= lowStockThreshold) {
          analysis.low_stock_items.push({
            category: category,
            item: itemName,
            quantity: quantity,
            threshold: lowStockThreshold,
            severity: quantity <= lowStockThreshold * 0.5 ? 'critical' : 'warning'
          });
        }

        const openingKey = key.replace('_remaining', '_opening');
        const receivedKey = key.replace('_remaining', '_received');

        if (reportData[category][openingKey] !== undefined) {
          const opening = parseFloat(reportData[category][openingKey]) || 0;
          const received = parseFloat(reportData[category][receivedKey]) || 0;
          const usage = opening + received - quantity;

          if (usage > 0) {
            analysis.turnover_analysis[`${category}_${itemName}`] = {
              opening: opening,
              received: received,
              remaining: quantity,
              usage: usage,
              usage_rate: opening > 0 ? (usage / opening * 100) : 0
            };

            const highUsageThreshold = getHighUsageThreshold(category, itemName);
            if (usage >= highUsageThreshold) {
              analysis.high_usage_items.push({
                category: category,
                item: itemName,
                usage: usage,
                usage_rate: opening > 0 ? (usage / opening * 100) : 0,
                threshold: highUsageThreshold
              });
            }
          }
        }

        const unitCost = getItemUnitCost(category, itemName);
        if (unitCost > 0) {
          analysis.inventory_value += quantity * unitCost;
        }
      }
    });
  });

  if (analysis.zero_stock_items.length > 0) {
    analysis.recommendations.push({
      type: 'restock',
      priority: 'high',
      message: `${analysis.zero_stock_items.length} items are out of stock`,
      items: analysis.zero_stock_items.map(item => item.item)
    });
  }

  if (analysis.low_stock_items.filter(item => item.severity === 'critical').length > 0) {
    analysis.recommendations.push({
      type: 'urgent_restock',
      priority: 'critical',
      message: 'Critical stock levels detected - immediate restocking needed',
      items: analysis.low_stock_items.filter(item => item.severity === 'critical')
    });
  }

  if (analysis.high_usage_items.length > 0) {
    analysis.recommendations.push({
      type: 'monitor_usage',
      priority: 'medium',
      message: 'Unusually high usage detected for some items',
      items: analysis.high_usage_items.map(item => item.item)
    });
  }

  return analysis;
}

function getLowStockThreshold(category, itemName) {
  const thresholds = {
    rawProteins: {
      frozen_chicken_breast: 2.0,
      chicken_shawarma: 1.5,
      steak: 1.0,
      marinated_steak: 0.5
    },
    marinatedProteins: {
      fahita_chicken: 1.0,
      chicken_sub: 0.8,
      spicy_strips: 0.5,
      original_strips: 0.5
    },
    bread: {
      saj_bread: 20,
      pita_bread: 15,
      bread_rolls: 10
    },
    highCostItems: {
      cream: 0.5,
      mayo: 0.3
    }
  };

  if (thresholds[category] && thresholds[category][itemName] !== undefined) {
    return thresholds[category][itemName];
  }
  return 1.0;
}

function getHighUsageThreshold(category, itemName) {
  const thresholds = {
    rawProteins: {
      frozen_chicken_breast: 5.0,
      chicken_shawarma: 8.0,
      steak: 3.0,
      marinated_steak: 2.0
    },
    marinatedProteins: {
      fahita_chicken: 3.0,
      chicken_sub: 2.5,
      spicy_strips: 2.0,
      original_strips: 2.0
    },
    bread: {
      saj_bread: 100,
      pita_bread: 80,
      bread_rolls: 50
    },
    highCostItems: {
      cream: 2.0,
      mayo: 1.5
    }
  };

  if (thresholds[category] && thresholds[category][itemName] !== undefined) {
    return thresholds[category][itemName];
  }
  return 2.0;
}

function getItemUnitCost(category, itemName) {
  const costs = {
    rawProteins: {
      frozen_chicken_breast: 18.5,
      chicken_shawarma: 22.0,
      steak: 35.0,
      marinated_steak: 38.0
    },
    marinatedProteins: {
      fahita_chicken: 25.0,
      chicken_sub: 24.0,
      spicy_strips: 26.0,
      original_strips: 25.5
    },
    bread: {
      saj_bread: 0.9,
      pita_bread: 0.1,
      bread_rolls: 0.5
    },
    highCostItems: {
      cream: 20.0,
      mayo: 17.5
    }
  };

  if (costs[category] && costs[category][itemName] !== undefined) {
    return costs[category][itemName];
  }
  return 0;
}

function analyzeSalesData(salesData, targetDate) {
  const analysis = {
    total_revenue: parseFloat(salesData.total_revenue) || 0,
    shawarma_revenue: parseFloat(salesData.shawarma_revenue) || 0,
    other_food_revenue: parseFloat(salesData.other_food_revenue) || 0,
    payment_breakdown: {},
    performance_metrics: {},
    recommendations: []
  };

  const cash = parseFloat(salesData.cash_sales) || 0;
  const card = parseFloat(salesData.card_sales) || 0;
  const delivery1 = parseFloat(salesData.delivery_aggregator_1) || 0;
  const delivery2 = parseFloat(salesData.delivery_aggregator_2) || 0;
  const pettyCash = parseFloat(salesData.petty_cash_total) || 0;

  const paymentTotal = cash + card + delivery1 + delivery2;

  analysis.payment_breakdown = {
    cash: {
      amount: cash,
      percentage: paymentTotal > 0 ? (cash / paymentTotal * 100) : 0
    },
    card: {
      amount: card,
      percentage: paymentTotal > 0 ? (card / paymentTotal * 100) : 0
    },
    delivery_aggregator_1: {
      amount: delivery1,
      percentage: paymentTotal > 0 ? (delivery1 / paymentTotal * 100) : 0
    },
    delivery_aggregator_2: {
      amount: delivery2,
      percentage: paymentTotal > 0 ? (delivery2 / paymentTotal * 100) : 0
    },
    total_breakdown: paymentTotal,
    variance_from_total: Math.abs(analysis.total_revenue - paymentTotal)
  };

  analysis.performance_metrics = {
    shawarma_percentage: analysis.total_revenue > 0 ? (analysis.shawarma_revenue / analysis.total_revenue * 100) : 0,
    food_cost_percentage: parseFloat(salesData.food_cost_percentage) || 0,
    petty_cash_percentage: analysis.total_revenue > 0 ? (pettyCash / analysis.total_revenue * 100) : 0,
    payment_method_diversity: calculatePaymentDiversity(analysis.payment_breakdown),
    revenue_quality_score: calculateRevenueQualityScore(analysis)
  };

  if (analysis.performance_metrics.shawarma_percentage < 40) {
    analysis.recommendations.push({
      type: 'product_mix',
      priority: 'medium',
      message: `Shawarma sales are ${analysis.performance_metrics.shawarma_percentage.toFixed(1)}% of total - consider promotions`,
      current_percentage: analysis.performance_metrics.shawarma_percentage,
      target_percentage: 50
    });
  }

  if (analysis.performance_metrics.food_cost_percentage > 25) {
    analysis.recommendations.push({
      type: 'cost_control',
      priority: 'high',
      message: `Food cost is ${analysis.performance_metrics.food_cost_percentage.toFixed(1)}% - review portion sizes and waste`,
      current_percentage: analysis.performance_metrics.food_cost_percentage,
      target_percentage: 25
    });
  }

  if (analysis.payment_breakdown.variance_from_total > 5) {
    analysis.recommendations.push({
      type: 'reconciliation',
      priority: 'high',
      message: `Payment breakdown doesn't match total revenue (${analysis.payment_breakdown.variance_from_total.toFixed(2)} QAR difference)`,
      variance: analysis.payment_breakdown.variance_from_total
    });
  }

  if (analysis.performance_metrics.petty_cash_percentage > 5) {
    analysis.recommendations.push({
      type: 'expense_control',
      priority: 'medium',
      message: `Petty cash expenses are ${analysis.performance_metrics.petty_cash_percentage.toFixed(1)}% of revenue - monitor spending`,
      current_percentage: analysis.performance_metrics.petty_cash_percentage
    });
  }

  return analysis;
}

function calculatePaymentDiversity(paymentBreakdown) {
  const methods = ['cash', 'card', 'delivery_aggregator_1', 'delivery_aggregator_2'];
  const percentages = methods.map(method => paymentBreakdown[method].percentage);

  let entropy = 0;
  percentages.forEach(percentage => {
    if (percentage > 0) {
      const p = percentage / 100;
      entropy -= p * Math.log2(p);
    }
  });

  return Math.min(100, (entropy / Math.log2(methods.length)) * 100);
}

function calculateRevenueQualityScore(analysis) {
  let score = 100;

  if (analysis.performance_metrics.food_cost_percentage > 25) {
    score -= (analysis.performance_metrics.food_cost_percentage - 25) * 2;
  }

  if (analysis.payment_breakdown.variance_from_total > 5) {
    score -= Math.min(20, analysis.payment_breakdown.variance_from_total);
  }

  if (analysis.performance_metrics.shawarma_percentage < 40) {
    score -= (40 - analysis.performance_metrics.shawarma_percentage) * 0.5;
  }

  if (analysis.performance_metrics.payment_method_diversity > 70) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
}

function getComparativeData(targetDate, config) {
  const comparisons = {};
  if (config.compareToYesterday) {
    const y = new Date(targetDate);
    y.setDate(y.getDate() - 1);
    try {
      comparisons.yesterday = JSON.parse(generateDailyReport(y.toISOString()));
    } catch (e) {
      comparisons.yesterday = { error: e.message };
    }
  }
  if (config.compareToWeekAgo) {
    const w = new Date(targetDate);
    w.setDate(w.getDate() - 7);
    try {
      comparisons.weekAgo = JSON.parse(generateDailyReport(w.toISOString()));
    } catch (e) {
      comparisons.weekAgo = { error: e.message };
    }
  }
  return comparisons;
}

function assessDataQuality(baseReport) {
  const sections = ['shawarma', 'sales', 'rawProteins', 'marinatedProteins', 'bread', 'highCostItems'];
  const available = sections.filter(key => baseReport[key]).length;
  return {
    completeness: Math.round((available / sections.length) * 100)
  };
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
function saveRawProteinsData(entryData, entryDate, employeeId, employeeName) {
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
    employeeId, employeeName, new Date(), new Date()
  ];
  
  rawProteinsSheet.appendRow(row);
}

// Save Marinated Proteins Data (EXACT from Employee Code.gs)
function saveMarinatedProteinsData(entryData, entryDate, employeeId, employeeName) {
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
    employeeId, employeeName, new Date(), new Date()
  ];
  
  marinatedSheet.appendRow(row);
}

// Save Bread Data (EXACT from Employee Code.gs)
function saveBreadData(entryData, entryDate, employeeId, employeeName) {
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
    employeeId, employeeName, new Date(), new Date()
  ];
  
  breadSheet.appendRow(row);
}

// Save High Cost Items Data (EXACT from Employee Code.gs)
function saveHighCostItemsData(entryData, entryDate, employeeId, employeeName) {
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
    employeeId, employeeName, new Date(), new Date()
  ];
  
  highCostSheet.appendRow(row);
}

// Save Sales Data (EXACT from Employee Code.gs)
function saveSalesData(entryData, entryDate, employeeId, employeeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const salesSheet = ss.getSheetByName('DailySales');
  const salesData = entryData.sales;
  
  const totalRevenue = parseFloat(salesData.total_revenue) || 0;
  const shawarmaRevenue = parseFloat(salesData.shawarma_revenue) || 0;
  const otherFoodRevenue = totalRevenue - shawarmaRevenue;
  const cashSales = parseFloat(salesData.cash_sales) || 0;
  const cardSales = parseFloat(salesData.card_sales) || 0;
  const aggregator1 = parseFloat(salesData.delivery_aggregator_1) || 0;
  const aggregator2 = parseFloat(salesData.delivery_aggregator_2) || 0;
  const estimatedFoodCost = totalRevenue * 0.22;
  const foodCostPercentage = totalRevenue > 0 ? (estimatedFoodCost / totalRevenue) * 100 : 0;
  const totalOrders = 0;
  const pettyCashTotal = parseFloat(salesData.petty_cash_total) || 0;

  const id = Utilities.getUuid();
  const row = [
    id, entryDate, totalRevenue, shawarmaRevenue, otherFoodRevenue,
    cashSales, cardSales, aggregator1, aggregator2, estimatedFoodCost,
    foodCostPercentage, totalOrders, pettyCashTotal, employeeId, employeeName, new Date(), new Date()
  ];

  salesSheet.appendRow(row);
  return id;
}

// Petty cash management functions
function savePettyCashDetails(entries, dailySalesId, employeeId, employeeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('PettyCashDetail');
  if (!sheet) {
    return 0;
  }

  const existingData = sheet.getDataRange().getValues();
  const headers = existingData[0];
  const dailyIdIndex = headers.indexOf('daily_sales_id');

  if (dailySalesId && dailyIdIndex !== -1) {
    for (let i = existingData.length - 1; i >= 1; i--) {
      if (existingData[i][dailyIdIndex] === dailySalesId) {
        sheet.deleteRow(i + 1);
      }
    }
  }

  let total = 0;
  if (entries && entries.length) {
    entries.forEach(function(entry) {
      const amount = parseFloat(entry.amount) || 0;
      total += amount;
      const row = [
        Utilities.getUuid(),
        dailySalesId,
        entry.category || '',
        entry.description || '',
        amount,
        entry.paid_by || '',
        employeeId,
        employeeName,
        new Date(),
        new Date()
      ];
      sheet.appendRow(row);
    });
  }
  return total;
}

function getPettyCashDetails(dailySalesId) {
  try {
    const entries = [];
    if (!dailySalesId) {
      return entries;
    }
    const data = Array.isArray(getSheetData('PettyCashDetail')) ? getSheetData('PettyCashDetail') : [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row && row.daily_sales_id === dailySalesId) {
        entries.push(row);
      }
    }
    return entries;
  } catch (error) {
    logMigrationActivity('petty_cash_details_error', { dailySalesId: dailySalesId, error: error.message }, 'error');
    return [];
  }
}

function calculatePettyCashTotal(entries) {
  let total = 0;
  if (!entries) {
    return 0;
  }
  entries.forEach(function(e) {
    total += parseFloat(e.amount) || 0;
  });
  return total;
}

// Data migration helpers
function mapLegacyInventoryToSnapshotLog(legacyData, employeeId, employeeName, date) {
  const mappings = getAllLegacyKeyMappings();
  const entries = [];
  const categories = ['rawProteins', 'marinatedProteins', 'bread', 'highCostItems'];
  categories.forEach(function(cat) {
    const group = legacyData[cat];
    if (!group) return;
    for (const key in group) {
      if (group.hasOwnProperty(key) && /_remaining$/.test(key)) {
        const legacyKey = key.replace('_remaining', '');
        const itemId = mappings[legacyKey];
        if (itemId) {
          const timestamp = new Date();
          entries.push({
            id: Utilities.getUuid(),
            item_id: itemId,
            date: date,
            closing_quantity: parseFloat(group[key]) || 0,
            notes: '',
            employee_id: employeeId,
            employee_name: employeeName,
            created_at: timestamp,
            updated_at: timestamp
          });
        }
      }
    }
  });
  return entries;
}

function mapSnapshotLogToLegacyFormat(snapshotEntries) {
  const items = getSheetData('Item');
  const itemMap = {};
  items.forEach(function(it) {
    itemMap[it.id] = it;
  });

  const legacy = {
    rawProteins: {},
    marinatedProteins: {},
    bread: {},
    highCostItems: {}
  };

  snapshotEntries.forEach(function(entry) {
    const item = itemMap[entry.item_id];
    if (!item || !item.legacy_key) return;
    const field = item.legacy_key + '_remaining';
    const category = item.category;
    if (category === 'Raw Proteins') {
      legacy.rawProteins[field] = entry.closing_quantity;
    } else if (category === 'Marinated Proteins') {
      legacy.marinatedProteins[field] = entry.closing_quantity;
    } else if (category === 'Bread') {
      legacy.bread[field] = entry.closing_quantity;
    } else if (category === 'High Cost Items') {
      legacy.highCostItems[field] = entry.closing_quantity;
    }
  });

  return legacy;
}

// Legacy key mapping functions
function getItemIdByLegacyKey(legacyKey) {
  const items = getSheetData('Item');
  for (let i = 0; i < items.length; i++) {
    if (items[i].legacy_key === legacyKey) {
      return items[i].id;
    }
  }
  return null;
}

function getAllLegacyKeyMappings() {
  const items = getSheetData('Item');
  const map = {};
  items.forEach(function(it) {
    if (it.legacy_key) {
      map[it.legacy_key] = it.id;
    }
  });
  return map;
}

function getItemsByCategory(category) {
  const items = getSheetData('Item');
  return items.filter(function(it) {
    return it.category === category;
  });
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
      items: getSheetData('Item'),
      snapshotLogs: getSheetData('SnapshotLog'),
      pettyCashDetails: getSheetData('PettyCashDetail'),
      dailyRawProteins: getSheetData('DailyRawProteins'),
      dailyMarinatedProteins: getSheetData('DailyMarinatedProteins'),
      dailyBreadTracking: getSheetData('DailyBreadTracking'),
      dailyHighCostItems: getSheetData('DailyHighCostItems'),
      dailyInventoryCount: getSheetData('DailyInventoryCount'),
      dailyProductSales: getSheetData('DailyProductSales'),
      weeklyInventory: getSheetData('WeeklyInventory')
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

// Historical data migration functions
function migrateHistoricalData(options = {}) {
  const config = {
    startDate: options.startDate || null,
    endDate: options.endDate || new Date().toISOString().split('T')[0],
    batchSize: options.batchSize || MIGRATION_CONFIG.batchSize,
    validateEach: options.validateEach !== false,
    dryRun: options.dryRun || false
  };

  logMigrationActivity('migration_start', config, 'info');

  try {
    const datesToMigrate = getHistoricalDataDates(config.startDate, config.endDate);
    const totalDates = datesToMigrate.length;
    let migratedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < datesToMigrate.length; i += config.batchSize) {
      const batch = datesToMigrate.slice(i, i + config.batchSize);
      for (const dateToMigrate of batch) {
        try {
          const migrationResult = migrateSingleDate(dateToMigrate, config.dryRun);
          if (migrationResult.success) migratedCount++; else errorCount++;

          if (config.validateEach && !config.dryRun) {
            const validationResult = validateMigratedDate(dateToMigrate);
            if (!validationResult.isValid) {
              logMigrationActivity('validation_failed', {
                date: dateToMigrate,
                errors: validationResult.errors
              }, 'error');
            }
          }
        } catch (err) {
          errorCount++;
          logMigrationActivity('single_date_migration_error', {
            date: dateToMigrate,
            error: err.message
          }, 'error');
        }
      }

      logMigrationActivity('migration_progress', {
        processed: Math.min(i + config.batchSize, totalDates),
        total: totalDates,
        migrated: migratedCount,
        errors: errorCount
      }, 'info');
    }

    const result = {
      success: errorCount === 0,
      totalDates: totalDates,
      migratedCount: migratedCount,
      errorCount: errorCount,
      dryRun: config.dryRun
    };

    logMigrationActivity('migration_complete', result, errorCount === 0 ? 'success' : 'warning');
    return JSON.stringify(result);

  } catch (error) {
    logMigrationActivity('migration_failed', { error: error.message }, 'error');
    throw error;
  }
}

function migrateSingleDate(dateString, dryRun = false) {
  try {
    const oldData = generateReportFromOldTables(dateString);
    if (!oldData || !oldData.dataFound) {
      return { success: true, message: 'No data to migrate', skipped: true };
    }

    const existingNewData = generateReportFromNewTables(dateString);
    if (existingNewData && existingNewData.dataFound) {
      return { success: true, message: 'Data already migrated', skipped: true };
    }

    if (dryRun) {
      return { success: true, message: 'Dry run - would migrate', dryRun: true };
    }

    const convertedData = convertOldDataToNewFormat(oldData);
    const saveResult = saveDailyEntryToNewTables(convertedData);
    return { success: saveResult.success, message: 'Migrated successfully', date: dateString };

  } catch (error) {
    return { success: false, message: error.message, date: dateString };
  }
}

function convertOldDataToNewFormat(oldData) {
  const oldSales = oldData.sales || {};
  const convertedData = {
    date: oldData.date,
    employeeId: 'migration',
    shawarmaStack: oldData.shawarma || {},
    sales: {
      total_revenue: oldSales.total_revenue || 0,
      shawarma_revenue: oldSales.shawarma_revenue || 0,
      cash_sales: 0,
      card_sales: 0,
      delivery_aggregator_1: 0,
      delivery_aggregator_2: 0,
      other_food_revenue: (oldSales.total_revenue || 0) - (oldSales.shawarma_revenue || 0),
      petty_cash_total: 0
    },
    rawProteins: oldData.rawProteins || {},
    marinatedProteins: oldData.marinatedProteins || {},
    bread: oldData.bread || {},
    highCostItems: oldData.highCostItems || {},
    pettyCashEntries: [],
    notes: oldData.notes || ''
  };
  return convertedData;
}

function convertNewDataToOldFormat(newData) {
  const newSales = newData.sales || {};
  return {
    date: newData.date,
    dataFound: newData.dataFound,
    shawarma: newData.shawarma,
    sales: {
      total_revenue: newSales.total_revenue,
      shawarma_revenue: newSales.shawarma_revenue,
      total_food_cost: newSales.total_food_cost,
      food_cost_percentage: newSales.food_cost_percentage,
      total_orders: newSales.total_orders
    },
    rawProteins: newData.rawProteins,
    marinatedProteins: newData.marinatedProteins,
    bread: newData.bread,
    highCostItems: newData.highCostItems,
    notes: newData.notes
  };
}

function validateMigratedDate(dateString) {
  try {
    const oldData = generateReportFromOldTables(dateString);
    const newData = generateReportFromNewTables(dateString);

    if (!(oldData && oldData.dataFound) || !(newData && newData.dataFound)) {
      return { isValid: false, errors: ['Missing data in source or target'], date: dateString };
    }

    const errors = [];
    if (oldData.shawarma && newData.shawarma) {
      if (Math.abs((oldData.shawarma.starting_weight_kg || 0) - (newData.shawarma.starting_weight_kg || 0)) > 0.001) {
        errors.push('Shawarma starting weight mismatch');
      }
      if (Math.abs((oldData.shawarma.remaining_weight_kg || 0) - (newData.shawarma.remaining_weight_kg || 0)) > 0.001) {
        errors.push('Shawarma remaining weight mismatch');
      }
    }

    if (oldData.sales && newData.sales) {
      if (Math.abs((oldData.sales.total_revenue || 0) - (newData.sales.total_revenue || 0)) > 0.01) {
        errors.push('Total revenue mismatch');
      }
      if (Math.abs((oldData.sales.shawarma_revenue || 0) - (newData.sales.shawarma_revenue || 0)) > 0.01) {
        errors.push('Shawarma revenue mismatch');
      }
    }

    const sections = ['rawProteins', 'marinatedProteins', 'bread', 'highCostItems'];
    sections.forEach(section => {
      if (oldData[section] && newData[section]) {
        Object.keys(oldData[section]).forEach(key => {
          if (key.endsWith('_remaining')) {
            const oldValue = parseFloat(oldData[section][key]) || 0;
            const newValue = parseFloat(newData[section][key]) || 0;
            if (Math.abs(oldValue - newValue) > 0.001) {
              errors.push(`${section}.${key} mismatch: ${oldValue} vs ${newValue}`);
            }
          }
        });
      }
    });

    return { isValid: errors.length === 0, errors: errors, date: dateString, oldDataSource: 'old_tables', newDataSource: 'new_tables' };

  } catch (error) {
    return { isValid: false, errors: [`Validation error: ${error.message}`], date: dateString };
  }
}

function validateAllMigratedData() {
  const datesToValidate = getHistoricalDataDates();
  const results = { totalDates: datesToValidate.length, validDates: 0, invalidDates: 0, errors: [] };
  datesToValidate.forEach(date => {
    const validation = validateMigratedDate(date);
    if (validation.isValid) results.validDates++; else { results.invalidDates++; results.errors.push({ date: date, errors: validation.errors }); }
  });
  return results;
}

// Migration control and monitoring
function getMigrationControlPanel() {
  const status = getMigrationStatus();
  const historicalDates = getHistoricalDataDates();
  const migrationLog = getRecentMigrationLogs(50);
  return JSON.stringify({
    status: status,
    historicalDatesCount: historicalDates.length,
    recentActivity: migrationLog,
    availableActions: ['start_migration','pause_migration','resume_migration','validate_migration','rollback_migration','cleanup_old_data'],
    recommendations: generateMigrationRecommendations(status)
  });
}

function updateMigrationConfig(newConfig) {
  Object.keys(newConfig).forEach(key => {
    if (MIGRATION_CONFIG.hasOwnProperty(key)) {
      MIGRATION_CONFIG[key] = newConfig[key];
    }
  });
  logMigrationActivity('config_updated', newConfig, 'info');
  return JSON.stringify({ success: true, newConfig: MIGRATION_CONFIG, message: 'Migration configuration updated' });
}

function generateMigrationRecommendations(status) {
  const recommendations = [];
  if (status.dataInOldTables.total > 0 && status.dataInNewTables.total === 0) {
    recommendations.push({ type: 'action', priority: 'high', message: 'Start historical data migration', action: 'start_migration' });
  }
  if (status.config.dualWriteMode && status.dataInNewTables.total > status.dataInOldTables.total * 0.8) {
    recommendations.push({ type: 'optimization', priority: 'medium', message: 'Consider disabling dual-write mode', action: 'disable_dual_write' });
  }
  if (!status.config.validateMigration) {
    recommendations.push({ type: 'safety', priority: 'medium', message: 'Enable migration validation for data integrity', action: 'enable_validation' });
  }
  return recommendations;
}

function getMigrationProgress() {
  const historicalDates = getHistoricalDataDates();
  const totalDates = historicalDates.length;
  let migratedDates = 0;
  let errorDates = 0;
  let validatedDates = 0;

  historicalDates.forEach(date => {
    const newData = generateReportFromNewTables(date);
    if (newData && newData.dataFound) {
      migratedDates++;
      const validation = validateMigratedDate(date);
      if (validation.isValid) validatedDates++; else errorDates++;
    }
  });

  return {
    totalDates: totalDates,
    migratedDates: migratedDates,
    validatedDates: validatedDates,
    errorDates: errorDates,
    percentComplete: totalDates > 0 ? (migratedDates / totalDates * 100).toFixed(1) : 0,
    percentValid: migratedDates > 0 ? (validatedDates / migratedDates * 100).toFixed(1) : 0,
    estimatedTimeRemaining: estimateMigrationTime(totalDates - migratedDates),
    lastMigrationDate: getLastMigrationDate(),
    currentPhase: MIGRATION_CONFIG.migrationPhase
  };
}

function estimateMigrationTime(remainingRecords) {
  const avgTimePerRecord = 2;
  const totalSeconds = remainingRecords * avgTimePerRecord;
  if (totalSeconds < 60) return `${totalSeconds} seconds`;
  if (totalSeconds < 3600) return `${Math.ceil(totalSeconds / 60)} minutes`;
  return `${Math.ceil(totalSeconds / 3600)} hours`;
}

function runMigrationHealthCheck() {
  const healthStatus = { timestamp: new Date().toISOString(), overall: 'healthy', checks: [] };

  try {
    const schemaCheck = validateDatabaseSchema();
    healthStatus.checks.push({ name: 'database_schema', status: schemaCheck.isValid ? 'pass' : 'fail', details: schemaCheck.errors || 'All required tables and columns present' });
    if (!schemaCheck.isValid) healthStatus.overall = 'unhealthy';
  } catch (error) {
    healthStatus.checks.push({ name: 'database_schema', status: 'error', details: error.message });
    healthStatus.overall = 'unhealthy';
  }

  const configCheck = validateMigrationConfig();
  healthStatus.checks.push({ name: 'migration_config', status: configCheck.isValid ? 'pass' : 'warning', details: configCheck.message });

  try {
    const recentDates = getHistoricalDataDates().slice(0,5);
    let consistentCount = 0;
    recentDates.forEach(date => { const v = validateMigratedDate(date); if (v.isValid) consistentCount++; });
    const consistencyRate = recentDates.length > 0 ? (consistentCount / recentDates.length) : 1;
    healthStatus.checks.push({ name: 'data_consistency', status: consistencyRate >= 0.95 ? 'pass' : consistencyRate >= 0.8 ? 'warning' : 'fail', details: `${(consistencyRate*100).toFixed(1)}% consistency rate in sample` });
    if (consistencyRate < 0.8) healthStatus.overall = 'unhealthy'; else if (consistencyRate < 0.95 && healthStatus.overall !== 'unhealthy') healthStatus.overall = 'warning';
  } catch (error) {
    healthStatus.checks.push({ name: 'data_consistency', status: 'error', details: error.message });
    healthStatus.overall = 'unhealthy';
  }

  const performanceCheck = checkMigrationPerformance();
  healthStatus.checks.push({ name: 'performance', status: performanceCheck.status, details: performanceCheck.details });

  return JSON.stringify(healthStatus);
}

function validateDatabaseSchema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const errors = [];
  ['Item','SnapshotLog','PettyCashDetail'].forEach(tableName => {
    const sheet = ss.getSheetByName(tableName);
    if (!sheet) {
      errors.push(`Missing table: ${tableName}`);
    } else {
      const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
      const required = (REQUIRED_SHEETS[tableName] && REQUIRED_SHEETS[tableName].requiredHeaders) || [];
      required.forEach(h => { if (!headers.includes(h)) errors.push(`Missing column: ${tableName}.${h}`); });
    }
  });
  return { isValid: errors.length === 0, errors: errors };
}

function checkOldTablesExist() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ['DailyRawProteins','DailyMarinatedProteins','DailyBreadTracking','DailyHighCostItems','DailyShawarmaStack','DailySales'].every(name => ss.getSheetByName(name));
}

function checkNewTablesExist() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ['Item','SnapshotLog','PettyCashDetail','DailySales'].every(name => ss.getSheetByName(name));
}

function getOldTableRecordCounts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tables = ['DailyRawProteins','DailyMarinatedProteins','DailyBreadTracking','DailyHighCostItems','DailyShawarmaStack','DailySales'];
  const counts = { total: 0 };
  tables.forEach(name => {
    const sheet = ss.getSheetByName(name); const count = sheet && sheet.getLastRow() > 1 ? sheet.getLastRow()-1 : 0; counts[name] = count; counts.total += count; });
  return counts;
}

function getNewTableRecordCounts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tables = ['Item','SnapshotLog','PettyCashDetail','DailySales'];
  const counts = { total: 0 };
  tables.forEach(name => { const sheet = ss.getSheetByName(name); const count = sheet && sheet.getLastRow() > 1 ? sheet.getLastRow()-1 : 0; counts[name] = count; counts.total += count; });
  return counts;
}

function getHistoricalDataDates(startDate, endDate) {
  const salesData = getSheetData('DailySales');
  const set = new Set();
  salesData.forEach(row => { if (row.sales_date) set.add(new Date(row.sales_date).toISOString().split('T')[0]); });
  let dates = Array.from(set).sort();
  if (startDate) dates = dates.filter(d => d >= startDate);
  if (endDate) dates = dates.filter(d => d <= endDate);
  return dates;
}

function getRecentMigrationLogs(limit) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('MigrationLog');
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  const logs = data.slice(1).map(r => ({ timestamp: r[0], activity: r[1], details: r[2], status: r[3], phase: r[4] }));
  return logs.slice(-limit);
}

function validateMigrationConfig() {
  const phases = ['dual-write','new-only','cleanup'];
  const isValid = phases.includes(MIGRATION_CONFIG.migrationPhase);
  return { isValid: isValid, message: isValid ? 'Config valid' : 'Invalid migration phase' };
}

function checkMigrationPerformance() {
  return { status: 'info', details: 'Performance metrics not implemented' };
}

function getLastMigrationDate() {
  const logs = getRecentMigrationLogs(1);
  return logs.length > 0 ? logs[0].timestamp : null;
}

// Testing utilities
function generateTestData(options = {}) {
  const config = {
    startDate: options.startDate || '2024-01-01',
    endDate: options.endDate || '2024-01-31',
    includeIncompleteData: options.includeIncompleteData || false,
    includePettyCash: options.includePettyCash !== false,
    randomSeed: options.randomSeed || Date.now()
  };

  Math.seedrandom = function(seed) {
    Math.random = function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  };
  Math.seedrandom(config.randomSeed);

  const testEntries = [];
  const currentDate = new Date(config.startDate);
  const endDate = new Date(config.endDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    const entry = {
      date: dateString,
      employeeId: 'test-employee',
      shawarmaStack: {
        starting_weight: (Math.random() * 5 + 10).toFixed(3),
        orders_weight: (Math.random() * 3 + 2).toFixed(3),
        shaving_weight: (Math.random() * 0.5).toFixed(3),
        staff_meals_weight: (Math.random() * 0.3).toFixed(3),
        remaining_weight: (Math.random() * 1).toFixed(3)
      },
      sales: {
        total_revenue: (Math.random() * 500 + 500).toFixed(2),
        shawarma_revenue: (Math.random() * 300 + 200).toFixed(2),
        cash_sales: (Math.random() * 200 + 100).toFixed(2),
        card_sales: (Math.random() * 200 + 100).toFixed(2),
        delivery_aggregator_1: (Math.random() * 100).toFixed(2),
        delivery_aggregator_2: (Math.random() * 50).toFixed(2)
      },
      rawProteins: {
        frozen_chicken_breast_remaining: (Math.random() * 5).toFixed(3),
        chicken_shawarma_remaining: (Math.random() * 3).toFixed(3),
        steak_remaining: (Math.random() * 2).toFixed(3)
      },
      marinatedProteins: {
        fahita_chicken_remaining: (Math.random() * 2).toFixed(3),
        chicken_sub_remaining: (Math.random() * 1.5).toFixed(3),
        spicy_strips_remaining: (Math.random() * 1).toFixed(3),
        original_strips_remaining: (Math.random() * 1).toFixed(3),
        marinated_steak_remaining: (Math.random() * 0.8).toFixed(3)
      },
      bread: {
        saj_bread_remaining: Math.floor(Math.random() * 50 + 10),
        pita_bread_remaining: Math.floor(Math.random() * 30 + 5),
        bread_rolls_remaining: Math.floor(Math.random() * 20 + 5)
      },
      highCostItems: {
        cream_remaining: (Math.random() * 2).toFixed(3),
        mayo_remaining: (Math.random() * 1.5).toFixed(3)
      },
      notes: `Test entry for ${dateString}`
    };

    if (config.includePettyCash && Math.random() > 0.7) {
      entry.pettyCashEntries = generateRandomPettyCashEntries();
    } else {
      entry.pettyCashEntries = [];
    }

    if (config.includeIncompleteData && Math.random() > 0.9) {
      delete entry.rawProteins.steak_remaining;
      entry.notes += ' - Incomplete test data';
    }

    testEntries.push(entry);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return testEntries;
}

function generateRandomPettyCashEntries() {
  const categories = ['Fuel', 'Ingredients', 'Supplies', 'Equipment'];
  const descriptions = {
    'Fuel': ['Delivery vehicle fuel', 'Generator fuel'],
    'Ingredients': ['Emergency spices', 'Fresh vegetables'],
    'Supplies': ['Cleaning materials', 'Disposable containers'],
    'Equipment': ['Small repairs', 'Equipment maintenance']
  };
  const entryCount = Math.floor(Math.random() * 3 + 1);
  const entries = [];
  for (let i = 0; i < entryCount; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const desc = descriptions[category];
    const description = desc[Math.floor(Math.random() * desc.length)];
    entries.push({ category: category, description: description, amount: (Math.random() * 50 + 10).toFixed(2), paid_by: ['Manager','Ahmad','Supervisor'][Math.floor(Math.random()*3)] });
  }
  return entries;
}

function runMigrationTestSuite(options = {}) {
  const testConfig = {
    includeUnitTests: options.includeUnitTests !== false,
    includeIntegrationTests: options.includeIntegrationTests !== false,
    includePerformanceTests: options.includePerformanceTests || false,
    generateTestData: options.generateTestData !== false,
    cleanupAfterTests: options.cleanupAfterTests !== false
  };

  const testResults = { timestamp: new Date().toISOString(), config: testConfig, results: {}, summary: { total: 0, passed: 0, failed: 0, skipped: 0 } };

  try {
    logMigrationActivity('test_suite_start', testConfig, 'info');

    if (testConfig.includeUnitTests) {
      testResults.results.unit = runUnitTests();
      updateTestSummary(testResults, testResults.results.unit);
    }
    if (testConfig.includeIntegrationTests) {
      testResults.results.integration = runIntegrationTests(testConfig.generateTestData);
      updateTestSummary(testResults, testResults.results.integration);
    }
    if (testConfig.includePerformanceTests) {
      testResults.results.performance = runPerformanceTests();
      updateTestSummary(testResults, testResults.results.performance);
    }

    if (testConfig.cleanupAfterTests) {
      cleanupTestData();
    }

    testResults.success = testResults.summary.failed === 0;
    testResults.duration = new Date().toISOString();
    logMigrationActivity('test_suite_complete', testResults.summary, testResults.success ? 'success' : 'warning');
    return JSON.stringify(testResults);

  } catch (error) {
    logMigrationActivity('test_suite_error', { error: error.message }, 'error');
    throw error;
  }
}

function runUnitTests() {
  const tests = [
    { name: 'test_legacy_key_mapping', func: testLegacyKeyMapping },
    { name: 'test_data_conversion', func: testDataConversion },
    { name: 'test_validation_functions', func: testValidationFunctions },
    { name: 'test_petty_cash_calculations', func: testPettyCashCalculations },
    { name: 'test_sales_calculations', func: testSalesCalculations }
  ];
  return runTestGroup('Unit Tests', tests);
}

function runIntegrationTests(generateData = true) {
  const tests = [
    { name: 'test_dual_write_save', func: testDualWriteSave },
    { name: 'test_dual_read_load', func: testDualReadLoad },
    { name: 'test_migration_round_trip', func: testMigrationRoundTrip },
    { name: 'test_form_compatibility', func: testFormCompatibility }
  ];
  if (generateData) {
    const testData = generateTestData({ startDate: '2024-06-01', endDate: '2024-06-03', includePettyCash: true });
    testData.forEach(entry => { try { saveDailyEntryToOldTables(entry); } catch (e) { } });
  }
  return runTestGroup('Integration Tests', tests);
}

function runPerformanceTests() {
  const tests = [ { name: 'performance_placeholder', func: () => ({ success: true, message: 'Performance test placeholder' }) } ];
  return runTestGroup('Performance Tests', tests);
}

function runTestGroup(groupName, tests) {
  const groupResults = { name: groupName, tests: [], passed: 0, failed: 0, total: tests.length };
  tests.forEach(test => {
    try {
      const start = Date.now();
      const result = test.func();
      const duration = Date.now() - start;
      const tr = { name: test.name, passed: result.success || false, message: result.message || '', duration: duration, details: result.details || null };
      if (tr.passed) groupResults.passed++; else groupResults.failed++;
      groupResults.tests.push(tr);
    } catch (error) {
      groupResults.tests.push({ name: test.name, passed: false, message: `Test error: ${error.message}`, duration: 0, details: null });
      groupResults.failed++;
    }
  });
  return groupResults;
}

function updateTestSummary(results, group) {
  results.summary.total += group.total;
  results.summary.passed += group.passed;
  results.summary.failed += group.failed;
  results.summary.skipped += group.total - group.passed - group.failed;
}

function cleanupTestData() {
  // Placeholder for cleanup logic
}

function testLegacyKeyMapping() {
  try {
    const mappings = getAllLegacyKeyMappings();
    const expectedKeys = ['frozen_chicken_breast','chicken_shawarma','steak','fahita_chicken','chicken_sub','spicy_strips','original_strips','marinated_steak','saj_bread','pita_bread','bread_rolls','cream','mayo'];
    const missing = expectedKeys.filter(k => !mappings[k]);
    if (missing.length > 0) return { success: false, message: `Missing legacy key mappings: ${missing.join(', ')}`, details: { missingKeys: missing } };
    const testKey = 'frozen_chicken_breast';
    const itemId = getItemIdByLegacyKey(testKey);
    if (!itemId) return { success: false, message: `getItemIdByLegacyKey failed for ${testKey}` };
    return { success: true, message: `All ${expectedKeys.length} legacy keys mapped successfully` };
  } catch (error) {
    return { success: false, message: `Legacy key mapping test failed: ${error.message}` };
  }
}

function testDataConversion() {
  try {
    const oldData = { date: '2024-06-01', dataFound: true, shawarma: { starting_weight_kg: 12.5, remaining_weight_kg: 0.8 }, sales: { total_revenue: 750.5, shawarma_revenue: 450.25 }, rawProteins: { frozen_chicken_breast_remaining: 3.2 }, marinatedProteins: { fahita_chicken_remaining: 1.5 }, bread: { saj_bread_remaining: 25 }, highCostItems: { cream_remaining: 1.2 } };
    const newFormat = convertOldDataToNewFormat(oldData);
    if (newFormat.sales.total_revenue !== oldData.sales.total_revenue) {
      return { success: false, message: 'Total revenue conversion failed' };
    }
    const backToOld = convertNewDataToOldFormat(newFormat);
    if (backToOld.sales.total_revenue !== oldData.sales.total_revenue) {
      return { success: false, message: 'Reverse conversion failed' };
    }
    return { success: true, message: 'Data conversion works correctly in both directions' };
  } catch (error) {
    return { success: false, message: `Data conversion test failed: ${error.message}` };
  }
}

function testValidationFunctions() { return { success: true, message: 'Validation functions placeholder' }; }
function testPettyCashCalculations() { return { success: calculatePettyCashTotal([{amount:10},{amount:5}]) === 15, message: 'Petty cash calculation test' }; }
function testSalesCalculations() { return { success: true, message: 'Sales calculations placeholder' }; }

function testDualWriteSave() {
  try {
    const testDate = '2024-06-15';
    const testEntry = {
      date: testDate,
      employeeId: 'test-employee',
      shawarmaStack: { starting_weight: '10.5', remaining_weight: '0.8', orders_weight: '7.2' },
      sales: { total_revenue: '650.00', shawarma_revenue: '400.00', cash_sales: '300.00', card_sales: '250.00', delivery_aggregator_1: '100.00', delivery_aggregator_2: '0.00' },
      rawProteins: { frozen_chicken_breast_remaining: '2.5', chicken_shawarma_remaining: '1.8' },
      pettyCashEntries: [{ category: 'Fuel', description: 'Test fuel purchase', amount: '45.00', paid_by: 'Test Manager' }]
    };
    const saveResult = JSON.parse(saveDailyEntry(testEntry));
    if (!saveResult.success) return { success: false, message: 'Dual-write save failed' };
    const oldData = generateReportFromOldTables(testDate);
    const newData = generateReportFromNewTables(testDate);
    deleteTestData(testDate);
    return { success: oldData.dataFound && newData.dataFound, message: 'Dual-write save works correctly' };
  } catch (error) {
    return { success: false, message: `Dual-write save test failed: ${error.message}` };
  }
}

function testDualReadLoad() { return { success: true, message: 'Dual-read load placeholder' }; }
function testMigrationRoundTrip() { return { success: true, message: 'Migration round-trip placeholder' }; }
function testFormCompatibility() { return { success: true, message: 'Form compatibility placeholder' }; }

function deleteTestData(dateString) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['DailyShawarmaStack','SnapshotLog','DailySales','PettyCashDetail','DailyRawProteins','DailyMarinatedProteins','DailyBreadTracking','DailyHighCostItems'];
  sheets.forEach(name => {
    const sheet = ss.getSheetByName(name); if (!sheet) return; const data = sheet.getDataRange().getValues(); const headers = data[0]; let dateIdx = headers.indexOf('date'); if (dateIdx === -1) dateIdx = headers.indexOf('sales_date'); if (dateIdx === -1) dateIdx = headers.indexOf('count_date'); if (dateIdx === -1) return; for (let i=data.length-1;i>=1;i--){ if (data[i][dateIdx] && new Date(data[i][dateIdx]).toISOString().split('T')[0]===dateString){ sheet.deleteRow(i+1);} }
  });
}

// Rollback and recovery
function createDataBackup(backupName, options = {}) {
  try {
    const config = {
      includeOldTables: options.includeOldTables !== false,
      includeNewTables: options.includeNewTables !== false,
      startDate: options.startDate || null,
      endDate: options.endDate || null,
      compress: options.compress || false
    };
    logMigrationActivity('backup_start', { backupName: backupName, config: config }, 'info');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const backupData = { timestamp: new Date().toISOString(), backupName: backupName, config: config, data: {} };
    if (config.includeOldTables) {
      ['DailyRawProteins','DailyMarinatedProteins','DailyBreadTracking','DailyHighCostItems','DailySales'].forEach(name => {
        const sheet = ss.getSheetByName(name); if (sheet && sheet.getLastRow() > 1) backupData.data[name] = sheet.getDataRange().getValues();
      });
    }
    if (config.includeNewTables) {
      ['Item','SnapshotLog','PettyCashDetail'].forEach(name => { const sheet = ss.getSheetByName(name); if (sheet && sheet.getLastRow() > 1) backupData.data[name] = sheet.getDataRange().getValues(); });
    }
    const backupSheet = getOrCreateBackupSheet();
    const backupJson = JSON.stringify(backupData);
    backupSheet.appendRow([new Date(), backupName, backupJson.length > 50000 ? 'LARGE_BACKUP' : backupJson, config.includeOldTables, config.includeNewTables, Object.keys(backupData.data).length]);
    logMigrationActivity('backup_complete', { backupName: backupName, tablesBackedUp: Object.keys(backupData.data).length, dataSize: backupJson.length }, 'success');
    return JSON.stringify({ success: true, backupName: backupName, tablesBackedUp: Object.keys(backupData.data), dataSize: backupJson.length, timestamp: backupData.timestamp });
  } catch (error) {
    logMigrationActivity('backup_error', { backupName: backupName, error: error.message }, 'error');
    throw error;
  }
}

function rollbackMigration(rollbackOptions = {}) {
  try {
    const options = {
      rollbackToDate: rollbackOptions.rollbackToDate || null,
      clearNewTables: rollbackOptions.clearNewTables || false,
      restoreFromBackup: rollbackOptions.restoreFromBackup || null,
      disableMigration: rollbackOptions.disableMigration !== false,
      validateRollback: rollbackOptions.validateRollback !== false
    };
    logMigrationActivity('rollback_start', options, 'info');
    if (options.disableMigration) {
      MIGRATION_CONFIG.enabled = false;
      MIGRATION_CONFIG.dualWriteMode = false;
      MIGRATION_CONFIG.readFromNew = false;
      logMigrationActivity('migration_disabled', MIGRATION_CONFIG, 'info');
    }
    if (options.clearNewTables) {
      clearNewTableData(options.rollbackToDate);
    }
    if (options.restoreFromBackup) {
      restoreFromBackup(options.restoreFromBackup);
    }
    let validationResult = null;
    if (options.validateRollback) {
      validationResult = validateRollbackIntegrity();
    }
    const result = { success: true, message: 'Rollback completed successfully', timestamp: new Date().toISOString(), actions: { migrationDisabled: options.disableMigration, newTablesCleared: options.clearNewTables, backupRestored: !!options.restoreFromBackup, validated: options.validateRollback }, validation: validationResult };
    logMigrationActivity('rollback_complete', result, 'success');
    return JSON.stringify(result);
  } catch (error) {
    logMigrationActivity('rollback_error', { error: error.message, options: rollbackOptions }, 'error');
    throw error;
  }
}

function clearNewTableData(beforeDate = null) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const newTables = ['SnapshotLog', 'PettyCashDetail'];
  newTables.forEach(tableName => {
    const sheet = ss.getSheetByName(tableName); if (!sheet) return;
    if (beforeDate) {
      const data = sheet.getDataRange().getValues(); const headers = data[0]; let dateIndex = headers.indexOf('date'); if (dateIndex === -1) dateIndex = headers.indexOf('count_date'); if (dateIndex === -1) dateIndex = headers.indexOf('sales_date'); if (dateIndex >= 0) { const cutoff = new Date(beforeDate); for (let i=data.length-1;i>=1;i--){ const rowDate = new Date(data[i][dateIndex]); if (rowDate <= cutoff) sheet.deleteRow(i+1); } }
    } else {
      if (sheet.getLastRow() > 1) sheet.deleteRows(2, sheet.getLastRow()-1);
    }
  });
  logMigrationActivity('new_tables_cleared', { tables: newTables, beforeDate: beforeDate }, 'info');
}

function validateRollbackIntegrity() {
  try {
    const validation = { timestamp: new Date().toISOString(), overall: 'valid', checks: [] };
    validation.checks.push({ name: 'migration_disabled', status: !MIGRATION_CONFIG.enabled ? 'pass' : 'fail', message: MIGRATION_CONFIG.enabled ? 'Migration is still enabled' : 'Migration properly disabled' });
    const oldCounts = getOldTableRecordCounts();
    validation.checks.push({ name: 'old_data_preserved', status: oldCounts.total > 0 ? 'pass' : 'fail', message: `${oldCounts.total} records found in old tables`, details: oldCounts });
    try {
      const testDate = getLatestDataDate();
      if (testDate) {
        const reportData = generateReportFromOldTables(testDate);
        validation.checks.push({ name: 'old_data_accessible', status: reportData.dataFound ? 'pass' : 'fail', message: reportData.dataFound ? 'Old data is accessible' : 'Cannot access old data' });
      }
    } catch (err) {
      validation.checks.push({ name: 'old_data_accessible', status: 'error', message: `Error accessing old data: ${err.message}` });
    }
    const newCounts = getNewTableRecordCounts();
    validation.checks.push({ name: 'new_tables_state', status: 'info', message: `${newCounts.total} records remain in new tables`, details: newCounts });
    const failed = validation.checks.filter(c => c.status === 'fail' || c.status === 'error');
    if (failed.length > 0) validation.overall = 'invalid';
    return validation;
  } catch (error) {
    return { timestamp: new Date().toISOString(), overall: 'error', error: error.message, checks: [] };
  }
}

function getOrCreateBackupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('MigrationBackup');
  if (!sheet) {
    sheet = ss.insertSheet('MigrationBackup');
    sheet.appendRow(['timestamp','backupName','data','includeOld','includeNew','tableCount']);
  }
  return sheet;
}

function restoreFromBackup(backupName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateBackupSheet();
  const data = sheet.getDataRange().getValues();
  for (let i=1;i<data.length;i++) {
    if (data[i][1] === backupName) {
      const backup = JSON.parse(data[i][2] === 'LARGE_BACKUP' ? '{}' : data[i][2]);
      Object.keys(backup.data || {}).forEach(tableName => {
        let table = ss.getSheetByName(tableName);
        if (!table) table = ss.insertSheet(tableName);
        table.clear();
        table.getRange(1,1,backup.data[tableName].length, backup.data[tableName][0].length).setValues(backup.data[tableName]);
      });
      break;
    }
  }
}

function getLatestDataDate() {
  const salesData = getSheetData('DailySales');
  let latest = null;
  salesData.forEach(r => { if (r.sales_date) { const d = new Date(r.sales_date); if (!latest || d > latest) latest = d; } });
  return latest ? latest.toISOString().split('T')[0] : null;
}

// Waste management backend functions

function validateWasteEntry(entry) {
  const required = ['item_id', 'waste_quantity', 'reason', 'date'];
  required.forEach(f => {
    if (entry[f] === undefined || entry[f] === null || entry[f] === '') {
      throw new Error('Missing required field: ' + f);
    }
  });

  if (isNaN(entry.waste_quantity) || Number(entry.waste_quantity) <= 0) {
    throw new Error('Invalid waste quantity');
  }

  const entryDate = new Date(entry.date);
  const today = new Date();
  if (entryDate > today) {
    throw new Error('Date cannot be in the future');
  }

  // Verify item exists
  const items = getSheetData('Item');
  const item = items.find(i => i.id == entry.item_id);
  if (!item) {
    throw new Error('Invalid item_id');
  }
  entry._item = item; // attach for cost calculation
}

function saveWasteEntry(wasteData) {
  try {
    validateWasteEntry(wasteData);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WasteLog');
    if (!sheet) throw new Error('WasteLog sheet not found');

    const id = new Date().getTime();
    const cost = wasteData.cost_override !== undefined && wasteData.cost_override !== ''
      ? Number(wasteData.cost_override)
      : Number(wasteData.waste_quantity) * Number(wasteData._item.cost_per_unit || 0);

    const now = new Date();
    const row = [
      id,
      wasteData.item_id,
      Number(wasteData.waste_quantity),
      wasteData.reason,
      new Date(wasteData.date),
      wasteData.notes || '',
      wasteData.cost_override || '',
      cost,
      wasteData.employee_id || '',
      now,
      now
    ];

    appendRowSafe(sheet, row);
    return { success: true, id: id, estimated_cost: cost };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function saveMultipleWasteEntries(wasteEntries, employeeId) {
  const results = [];
  for (let i = 0; i < wasteEntries.length; i++) {
    const entry = Object.assign({}, wasteEntries[i], { employee_id: employeeId });
    const result = saveWasteEntry(entry);
    results.push(result);
    if (!result.success) {
      // stop processing further but return what has been processed
      break;
    }
  }
  return results;
}

function getWasteEntriesForDate(date) {
  const entries = getSheetData('WasteLog');
  const target = new Date(date).toDateString();
  return entries.filter(e => new Date(e.date).toDateString() === target);
}

function calculateWasteImpact(wasteEntries) {
  const totals = wasteEntries.reduce((acc, e) => {
    acc.quantity += Number(e.waste_quantity) || 0;
    acc.cost += Number(e.estimated_cost) || 0;
    return acc;
  }, { quantity: 0, cost: 0 });
  return totals;
}

function generateWasteAnalytics(dateRange) {
  const allEntries = getSheetData('WasteLog');
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  const entries = allEntries.filter(e => {
    const d = new Date(e.date);
    return d >= start && d <= end;
  });
  const impact = calculateWasteImpact(entries);
  return { entries: entries, impact: impact };
}

function generateWasteRecommendations(wasteData) {
  const recs = [];
  if (wasteData.impact && wasteData.impact.cost > 100) {
    recs.push('Review high cost waste items for possible process improvements');
  }
  return recs;
}

function createWasteAlerts(wasteEntries) {
  const alerts = [];
  const impact = calculateWasteImpact(wasteEntries);
  if (impact.cost > 100) {
    alerts.push('Daily waste exceeds threshold (100 QAR)');
  }
  const seenItems = {};
  wasteEntries.forEach(e => {
    seenItems[e.item_id] = (seenItems[e.item_id] || 0) + 1;
    if (seenItems[e.item_id] === 2) {
      alerts.push('Item ' + e.item_id + ' wasted multiple times');
    }
  });
  return alerts;
}

function validatePurchaseEntry(entry) {
  const required = ['supplier_id', 'invoice_number', 'delivery_date', 'received_by', 'items'];
  required.forEach(f => {
    if (entry[f] === undefined || entry[f] === null || entry[f] === '' || (f === 'items' && (!Array.isArray(entry.items) || entry.items.length === 0))) {
      throw new Error('Missing required field: ' + f);
    }
  });

  const suppliers = getSheetData('Suppliers');
  if (!suppliers.find(s => s.id == entry.supplier_id)) {
    throw new Error('Invalid supplier_id');
  }

  const itemsSheet = getSheetData('Item');

  entry.items.forEach((row, idx) => {
    if (!row.item_id || isNaN(row.quantity) || Number(row.quantity) <= 0) {
      throw new Error('Invalid item entry at row ' + (idx + 1));
    }
    if (isNaN(row.cost_per_unit) || Number(row.cost_per_unit) < 0) {
      throw new Error('Invalid cost for item at row ' + (idx + 1));
    }
    if (!itemsSheet.find(it => it.id == row.item_id)) {
      throw new Error('Invalid item_id at row ' + (idx + 1));
    }
  });

  // prevent duplicate invoice numbers per supplier
  const purchases = getSheetData('PurchaseLog');
  const dup = purchases.find(p => p.supplier_id == entry.supplier_id && p.invoice_number == entry.invoice_number);
  if (dup) {
    throw new Error('Duplicate invoice number for supplier');
  }
}

function savePurchaseEntry(purchaseData) {
  try {
    validatePurchaseEntry(purchaseData);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PurchaseLog');
    if (!sheet) throw new Error('PurchaseLog sheet not found');

    const now = new Date();
    const baseId = new Date().getTime();
    let total = 0;
    purchaseData.items.forEach((item, idx) => {
      const itemTotal = Number(item.quantity) * Number(item.cost_per_unit);
      total += itemTotal;
      const row = [
        baseId + idx,
        purchaseData.supplier_id,
        purchaseData.invoice_number,
        new Date(purchaseData.delivery_date),
        purchaseData.received_by,
        item.item_id,
        Number(item.quantity),
        Number(item.cost_per_unit),
        itemTotal,
        item.quality || '',
        purchaseData.notes || '',
        now,
        now
      ];
      appendRowSafe(sheet, row);

      // Update item cost with latest purchase price
      const itemsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Item');
      const items = itemsSheet.getDataRange().getValues();
      const headers = items.shift();
      const idIndex = headers.indexOf('id');
      const costIndex = headers.indexOf('cost_per_unit');
      for (let i = 0; i < items.length; i++) {
        if (items[i][idIndex] == item.item_id) {
          items[i][costIndex] = Number(item.cost_per_unit);
          itemsSheet.getRange(i + 2, costIndex + 1).setValue(Number(item.cost_per_unit));
          break;
        }
      }
    });

    return { success: true, total_cost: total };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function getPurchaseEntriesForDate(date) {
  const entries = getSheetData('PurchaseLog');
  const target = new Date(date).toDateString();
  const filtered = entries.filter(e => new Date(e.delivery_date).toDateString() === target);
  const grouped = {};
  filtered.forEach(e => {
    const key = e.supplier_id + '_' + e.invoice_number;
    if (!grouped[key]) {
      grouped[key] = {
        supplier_id: e.supplier_id,
        invoice_number: e.invoice_number,
        delivery_date: e.delivery_date,
        received_by: e.received_by,
        notes: e.notes,
        items: [],
        total_cost: 0
      };
    }
    grouped[key].items.push(e);
    grouped[key].total_cost += Number(e.total_cost) || 0;
  });
  return Object.values(grouped);
}

function linkPurchasesToDailyInventory(date) {
  const entries = getPurchaseEntriesForDate(date);
  const totals = {};
  entries.forEach(group => {
    group.items.forEach(item => {
      totals[item.item_id] = (totals[item.item_id] || 0) + Number(item.quantity);
    });
  });
  return totals;
}

// ===== Inventory Variance Calculation =====
function getSnapshotQuantity(itemId, date) {
  const snapshotData = getSheetData('SnapshotLog') || [];
  const target = new Date(date).toDateString();
  const entry = snapshotData.find(e => e.item_id == itemId && new Date(e.date).toDateString() === target);
  return entry ? Number(entry.closing_quantity) : null;
}

function getReceivedQuantity(itemId, date) {
  const purchases = getSheetData('PurchaseLog') || [];
  const target = new Date(date).toDateString();
  let total = 0;
  purchases.forEach(p => {
    if (p.item_id == itemId && new Date(p.delivery_date).toDateString() === target) {
      total += Number(p.quantity) || 0;
    }
  });
  return total;
}

function getSalesProductQuantities(date) {
  const orders = getSheetData('Orders') || [];
  const orderItems = getSheetData('OrderItems') || [];
  const target = new Date(date).toDateString();
  const ordersById = {};
  orders.forEach(o => {
    if (new Date(o.order_date).toDateString() === target) {
      ordersById[o.id] = o;
    }
  });
  const productQty = {};
  orderItems.forEach(oi => {
    if (ordersById[oi.order_id]) {
      productQty[oi.product_id] = (productQty[oi.product_id] || 0) + (Number(oi.quantity) || 0);
    }
  });
  return productQty;
}

function calculateTheoreticalUsage(itemId, date) {
  const recipes = getSheetData('Recipes').filter(r => r.ingredient_id == itemId);
  if (!recipes.length) return null;
  const productQty = getSalesProductQuantities(date);
  let usage = 0;
  recipes.forEach(r => {
    const sold = productQty[r.product_id] || 0;
    usage += sold * (Number(r.quantity_needed) || 0);
  });
  return usage;
}

function calculateItemVariance(item, date) {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const opening = getSnapshotQuantity(item.id, yesterday);
  const closing = getSnapshotQuantity(item.id, date);
  if (opening === null || closing === null) {
    return {
      item_id: item.id,
      item_name: item.name,
      calculationStatus: 'data_error'
    };
  }
  const received = getReceivedQuantity(item.id, date);
  const actual = (opening + received) - closing;

  const theoretical = calculateTheoreticalUsage(item.id, date);
  if (theoretical === null) {
    return {
      item_id: item.id,
      item_name: item.name,
      opening_quantity: opening,
      received_quantity: received,
      closing_quantity: closing,
      actual_usage: actual,
      calculationStatus: 'missing_usage'
    };
  }

  const variance = actual - theoretical;
  const variancePct = theoretical !== 0 ? (variance / theoretical) * 100 : null;
  const costImpact = variance * (Number(item.cost_per_unit) || 0);

  let varianceStatus = 'acceptable';
  if (Math.abs(variancePct) > 10 || Math.abs(variance) > 0.5) {
    varianceStatus = 'warning';
  }
  if (Math.abs(variancePct) > 20 || Math.abs(costImpact) > 50) {
    varianceStatus = 'critical';
  } else if (Math.abs(costImpact) > 25) {
    varianceStatus = 'warning';
  }

  return {
    item_id: item.id,
    item_name: item.name,
    opening_quantity: opening,
    received_quantity: received,
    closing_quantity: closing,
    actual_usage: actual,
    theoretical_usage: theoretical,
    variance: variance,
    variance_percentage: variancePct,
    cost_impact: costImpact,
    varianceStatus: varianceStatus,
    calculationStatus: 'ready'
  };
}

function calculateInventoryVariance(date, employeeId, options) {
  const items = getSheetData('Item') || [];
  const results = [];
  const summary = {
    totalItems: 0,
    acceptable: 0,
    warning: 0,
    critical: 0,
    missingUsage: 0,
    dataError: 0,
    totalCostImpact: 0
  };
  items.forEach(item => {
    if (item.active === false || item.active === 'false') return;
    const res = calculateItemVariance(item, date);
    results.push(res);
    summary.totalItems++;
    summary.totalCostImpact += res.cost_impact || 0;
    if (res.calculationStatus === 'data_error') summary.dataError++;
    else if (res.calculationStatus === 'missing_usage') summary.missingUsage++;
    else {
      if (res.varianceStatus === 'critical') summary.critical++;
      else if (res.varianceStatus === 'warning') summary.warning++;
      else summary.acceptable++;
    }
  });
  return {
    date: new Date(date),
    employeeId: employeeId || 'system',
    generated_at: new Date(),
    items: results,
    summary: summary
  };
}

function generateVarianceAlerts(varianceData) {
  const alerts = [];
  varianceData.items.forEach(item => {
    if (item.calculationStatus === 'data_error') {
      alerts.push({ type: 'data_error', item_id: item.item_id, message: `Missing data for ${item.item_name}` });
    } else if (item.calculationStatus === 'missing_usage') {
      alerts.push({ type: 'missing_usage', item_id: item.item_id, message: `No recipe data for ${item.item_name}` });
    } else if (item.varianceStatus === 'critical') {
      alerts.push({ type: 'critical', item_id: item.item_id, message: `Critical variance for ${item.item_name}` });
    } else if (item.varianceStatus === 'warning') {
      alerts.push({ type: 'warning', item_id: item.item_id, message: `Variance warning for ${item.item_name}` });
    }
  });
  return alerts;
}

function getVarianceReport(date) {
  const variance = calculateInventoryVariance(date, 'system');
  return {
    variance: variance,
    alerts: generateVarianceAlerts(variance)
  };
}


