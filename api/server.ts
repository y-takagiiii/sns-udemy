import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const app = express();
const PORT = 8000;
const prisma = new PrismaClient();
// jsonを使う宣言
app.use(express.json());
// 新規ユーザー登録
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return res.json({ user });
});

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
