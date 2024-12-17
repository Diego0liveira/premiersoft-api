-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
-- Insert initial data
INSERT INTO "User" ("name", "email", "role") VALUES
('John Doe', 'john.doe@example.com','admin'),
('Jane Smith', 'jane.smith@example.com', 'user'),
('Alice Johnson', 'alice.johnson@example.com', 'user'),
('Bob Brown', 'bob.brown@example.com', 'user'),
('Charlie Davis', 'charlie.davis@example.com', 'user'),
('Diana Evans', 'diana.evans@example.com', 'user'),
('Evan Harris', 'evan.harris@example.com', 'user'),
('Fiona Green', 'fiona.green@example.com', 'user'),
('George King', 'george.king@example.com', 'user'),
('Hannah Lee', 'hannah.lee@example.com', 'user');