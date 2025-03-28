-- CreateTable
CREATE TABLE "GameCreated" (
    "dbId" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost_in_sui" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,

    CONSTRAINT "GameCreated_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "RewardChaimed" (
    "dbId" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "participant_index" INTEGER NOT NULL,
    "reward" TEXT NOT NULL,

    CONSTRAINT "RewardChaimed_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "TicketDestroyed" (
    "dbId" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "participant_index" INTEGER NOT NULL,

    CONSTRAINT "TicketDestroyed_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "TicketPurchase" (
    "dbId" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "game_name" TEXT NOT NULL,
    "participant_index" INTEGER NOT NULL,
    "end_time" TEXT NOT NULL,

    CONSTRAINT "TicketPurchase_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "WinnerDetermined" (
    "dbId" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "participant_index" INTEGER NOT NULL,

    CONSTRAINT "WinnerDetermined_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "cursor" (
    "id" TEXT NOT NULL,
    "eventSeq" TEXT NOT NULL,
    "txDigest" TEXT NOT NULL,

    CONSTRAINT "cursor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameCreated_dbId_key" ON "GameCreated"("dbId");

-- CreateIndex
CREATE UNIQUE INDEX "RewardChaimed_dbId_key" ON "RewardChaimed"("dbId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketDestroyed_dbId_key" ON "TicketDestroyed"("dbId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketPurchase_dbId_key" ON "TicketPurchase"("dbId");

-- CreateIndex
CREATE UNIQUE INDEX "WinnerDetermined_dbId_key" ON "WinnerDetermined"("dbId");
