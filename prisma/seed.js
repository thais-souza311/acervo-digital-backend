const { PrismaClient, Perfil } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const senha = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@acervodigital.com",
    },
    update: {},
    create: {
      email: "admin@acervodigital.com",
      senha,
      perfil: Perfil.ADMIN,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
  });

