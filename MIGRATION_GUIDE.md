# Migration System - Complete User Guide

## ⚠️ IMPORTANT: Currently No UI Available

The migration infrastructure exists in the code but **there is currently NO user interface** to access it. You have two options:

### Option 1: Use Google Apps Script Editor (Recommended for now)
1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. You'll see the `Code.gs` file
4. Use the **Run** button to execute functions manually

### Option 2: Wait for Migration UI (Coming Soon)
A Migration Control Panel will be added to the Management Dashboard tab.

---

## Available Migration Functions

### 1. Initialize Item Costs
**Function**: `initializeItemCostsFromLegacy()`

**What it does**: Populates the Item table with reference costs from the legacy hardcoded values

**When to run**: ONCE, before first migration

**How to run**:
```javascript
// In Apps Script Editor
function runInit() {
  const result = initializeItemCostsFromLegacy();
  Logger.log(result);
}
```

**Expected output**:
```javascript
{
  success: true,
  updated: 13,  // Number of items updated
  message: "Updated 13 item costs"
}
```

---

### 2. Check Migration Status
**Function**: `getMigrationStatus()`

**What it does**: Shows current migration configuration and table record counts

**How to run**:
```javascript
function checkStatus() {
  const status = getMigrationStatus();
  Logger.log(JSON.stringify(status, null, 2));
}
```

**Expected output**:
```javascript
{
  config: {
    enabled: true,
    dualWriteMode: true,
    readFromNew: true,
    fallbackToOld: true,
    migrationPhase: "dual-write"
  },
  timestamp: "2024-12-09T...",
  oldTablesExist: true,
  newTablesExist: true,
  dataInOldTables: {
    DailyRawProteins: 45,
    DailyMarinatedProteins: 45,
    // ... other counts
    total: 225
  },
  dataInNewTables: {
    Item: 13,
    SnapshotLog: 0,
    PettyCashDetail: 0,
    total: 13
  }
}
```

---

### 3. Test Migration (Dry Run)
**Function**: `migrateHistoricalData(options)`

**What it does**: Simulates migration WITHOUT actually moving data

**How to run**:
```javascript
function testMigration() {
  const result = migrateHistoricalData({
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    dryRun: true,  // ← IMPORTANT: true = test only
    validateEach: true
  });
  Logger.log(result);
}
```

**Expected output**:
```javascript
{
  success: true,
  totalDates: 31,
  migratedCount: 31,
  errorCount: 0,
  dryRun: true  // ← Confirms no actual changes made
}
```

---

### 4. Migrate Historical Data (ACTUAL)
**Function**: `migrateHistoricalData(options)`

**What it does**: Actually migrates data from old to new tables

**⚠️ WARNING**: This modifies your data! Test with dry run first!

**How to run**:
```javascript
function doMigration() {
  const result = migrateHistoricalData({
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    dryRun: false,  // ← IMPORTANT: false = actually migrate
    validateEach: true,
    batchSize: 10  // Process 10 dates at a time
  });
  Logger.log(result);
}
```

---

### 5. Migrate Single Date
**Function**: `migrateSingleDate(dateString, dryRun)`

**What it does**: Migrates just one specific date

**How to run**:
```javascript
function migrateSingleDay() {
  // Test first
  const testResult = migrateSingleDate('2024-01-15', true);
  Logger.log("Dry run:", testResult);

  // If OK, do actual migration
  const result = migrateSingleDate('2024-01-15', false);
  Logger.log("Actual:", result);
}
```

---

### 6. Rollback Migration
**Function**: `rollbackMigrationForDate(dateString)`

**What it does**: Removes migrated data from new tables for a specific date

**When to use**: If migration went wrong or data looks incorrect

**How to run**:
```javascript
function rollbackDate() {
  const result = rollbackMigrationForDate('2024-01-15');
  Logger.log(result);
}
```

**Expected output**:
```javascript
{
  success: true,
  message: "Rollback completed successfully",
  date: "2024-01-15"
}
```

---

### 7. Rollback Date Range
**Function**: `rollbackMigrationDateRange(startDate, endDate)`

**What it does**: Rolls back multiple dates

**How to run**:
```javascript
function rollbackRange() {
  const result = rollbackMigrationDateRange('2024-01-01', '2024-01-31');
  Logger.log(result);
}
```

---

### 8. Validate Migration
**Function**: `validateMigratedDate(dateString)`

**What it does**: Checks if data was migrated correctly

**How to run**:
```javascript
function validateDate() {
  const result = validateMigratedDate('2024-01-15');
  Logger.log(JSON.stringify(result, null, 2));
}
```

---

### 9. Get Cost Variance Report
**Function**: `getCostVarianceReport(dateString)`

**What it does**: Shows actual vs reference costs with variance

**How to run**:
```javascript
function checkCosts() {
  const result = getCostVarianceReport('2024-12-09');
  const data = JSON.parse(result);
  Logger.log(JSON.stringify(data, null, 2));
}
```

**Expected output**:
```javascript
{
  success: true,
  date: "2024-12-09",
  costAnalysis: {
    actualTotal: 450.00,
    referenceTotal: 420.00,
    totalVariance: 30.00,
    totalVariancePercent: 7.1,
    itemBreakdown: [
      {
        item: "Frozen Chicken Breast",
        usage: 5.2,
        unit: "kg",
        actualCostPerUnit: 19.50,
        referenceCostPerUnit: 18.50,
        variance: 5.20,
        variancePercent: 5.4
      },
      // ... more items
    ]
  },
  summary: {
    status: "acceptable"  // or "warning" or "critical"
  }
}
```

---

## Step-by-Step Migration Process

### Phase 1: Preparation
1. ✅ **Backup your data** - Export all sheets to CSV
2. ✅ **Initialize costs**: Run `initializeItemCostsFromLegacy()`
3. ✅ **Check status**: Run `getMigrationStatus()`
4. ✅ **Test on one date**:
   ```javascript
   migrateSingleDate('2024-01-01', true)  // Dry run
   ```

### Phase 2: Test Migration
1. ✅ **Small batch test** (dry run):
   ```javascript
   migrateHistoricalData({
     startDate: '2024-01-01',
     endDate: '2024-01-07',
     dryRun: true
   })
   ```
2. ✅ **Review results** - Check for errors
3. ✅ **If OK**, do actual migration on test week:
   ```javascript
   migrateHistoricalData({
     startDate: '2024-01-01',
     endDate: '2024-01-07',
     dryRun: false
   })
   ```
4. ✅ **Validate**:
   ```javascript
   validateMigratedDate('2024-01-01')
   validateMigratedDate('2024-01-07')
   ```

### Phase 3: Full Migration
1. ✅ **Migrate all data** in batches:
   ```javascript
   // January
   migrateHistoricalData({
     startDate: '2024-01-01',
     endDate: '2024-01-31',
     dryRun: false,
     batchSize: 10
   })

   // February
   migrateHistoricalData({
     startDate: '2024-02-01',
     endDate: '2024-02-29',
     dryRun: false,
     batchSize: 10
   })
   // ... continue for other months
   ```

2. ✅ **Check migration logs**:
   - Look at the MigrationLog sheet in your spreadsheet
   - Review for any errors or warnings

3. ✅ **Validate random dates**:
   ```javascript
   validateMigratedDate('2024-03-15')
   validateMigratedDate('2024-06-22')
   validateMigratedDate('2024-09-10')
   ```

### Phase 4: Verification
1. ✅ **Compare record counts**:
   ```javascript
   getMigrationStatus()
   // Check that dataInOldTables.total ≈ dataInNewTables.total
   ```

2. ✅ **Test loading data** in Daily Entry forms:
   - Open management dashboard
   - Select a migrated date
   - Click "Load Existing"
   - Verify ALL fields populate correctly
   - Check payment breakdown shows cash/card/delivery sales

3. ✅ **Check cost variance reports**:
   ```javascript
   getCostVarianceReport('2024-06-15')
   // Review actual vs reference costs
   ```

---

## Troubleshooting

### Issue: Migration shows errors
**Solution**:
1. Check MigrationLog sheet for details
2. Validate the problematic date: `validateMigratedDate('problem-date')`
3. If needed, rollback: `rollbackMigrationForDate('problem-date')`
4. Fix underlying data issue
5. Re-migrate: `migrateSingleDate('problem-date', false)`

### Issue: Data doesn't load in forms
**Symptoms**: When you click "Load Existing", form stays empty

**Check**:
1. Backend is returning data: Check browser console for errors
2. `generateDailyReport()` is working:
   ```javascript
   function testReport() {
     const report = generateDailyReport('2024-12-09');
     Logger.log(report);
   }
   ```
3. Data exists in database: Check the DailySalesBreakdown sheet

### Issue: Cost variance shows 0%
**Cause**: Reference costs not initialized

**Solution**:
```javascript
initializeItemCostsFromLegacy()
```

---

## Migration Configuration

The migration behavior is controlled by `MIGRATION_CONFIG` in Code.gs:

```javascript
const MIGRATION_CONFIG = {
  enabled: true,              // Enable migration features
  dualWriteMode: true,        // Write to both old and new tables
  readFromNew: true,          // Read from new tables first
  fallbackToOld: true,        // Fall back to old if new is empty
  migrationPhase: 'dual-write', // Current phase
  batchSize: 50,              // How many dates to process at once
  logMigration: true,         // Log to MigrationLog sheet
  validateMigration: true     // Validate after migration
};
```

**⚠️ DO NOT MODIFY** these settings unless you understand the implications!

---

## Coming Soon: Migration UI

A Migration Control Panel will be added to the Management Dashboard with:
- ✅ Visual migration status display
- ✅ Buttons to run migrations
- ✅ Progress indicators
- ✅ Rollback controls
- ✅ Validation reports
- ✅ Cost variance viewer

Until then, use the Apps Script Editor method described above.

---

## Need Help?

1. Check the `ANALYSIS_AND_FIXES.md` file for detailed technical info
2. Review the MigrationLog sheet in your spreadsheet
3. Use dry run mode to test before actual migrations
4. Keep backups of your data!
