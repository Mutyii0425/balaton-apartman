-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "guests" INTEGER NOT NULL DEFAULT 2,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "apartmentId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Booking" ("createdAt", "email", "endDate", "id", "name", "phone", "startDate", "status") SELECT "createdAt", "email", "endDate", "id", "name", "phone", "startDate", "status" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
