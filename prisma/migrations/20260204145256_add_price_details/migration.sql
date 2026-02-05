-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "guests" INTEGER NOT NULL DEFAULT 0,
    "adults" INTEGER NOT NULL DEFAULT 2,
    "children" INTEGER NOT NULL DEFAULT 0,
    "hasDog" BOOLEAN NOT NULL DEFAULT false,
    "needsHeating" BOOLEAN NOT NULL DEFAULT false,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "apartmentId" INTEGER NOT NULL DEFAULT 1,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Booking" ("apartmentId", "createdAt", "email", "endDate", "guests", "id", "name", "phone", "startDate", "status") SELECT "apartmentId", "createdAt", "email", "endDate", "guests", "id", "name", "phone", "startDate", "status" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
