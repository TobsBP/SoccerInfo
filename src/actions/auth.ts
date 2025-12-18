'use server';

import bcrypt from 'bcryptjs';
import { signIn, signOut } from '@/auth';
import prisma from '@/lib/prisma';

export async function loginWithGoogle() {
	await signIn('google', { redirectTo: '/' });
}

export async function loginWithCredentials(formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: '/',
		});
	} catch (error) {
		if ((error as Error).message.includes('CredentialsSignin')) {
			return { error: 'Credenciais inválidas.' };
		}
		throw error;
	}
}

export async function register(formData: FormData) {
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password || !name) {
		return { error: 'Campos obrigatórios faltando.' };
	}

	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (existingUser) {
		return { error: 'Email já cadastrado.' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	await signIn('credentials', {
		email,
		password,
		redirectTo: '/',
	});
}

export async function logout() {
	await signOut({ redirectTo: '/sing-in' });
}
