import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(currentDirectory, "../.env");

if (existsSync(envPath)) {
	process.loadEnvFile(envPath);
}

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
	throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is required");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (getApps().length === 0) {
	initializeApp({
		credential: cert(serviceAccount),
	});
}

export const db = getFirestore();
