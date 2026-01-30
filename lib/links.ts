import { getSupabase } from './supabase';

// Generate a secure random token (16-24 chars)
function generateToken(length: number = 20): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}

// Simple hash for password (client-side, for demo purposes)
// In production, use server-side hashing with bcrypt
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Calculate expiry date from expiry option
function calculateExpiryDate(expiryOption: string): Date {
    const now = new Date();
    switch (expiryOption) {
        case '1h':
            return new Date(now.getTime() + 1 * 60 * 60 * 1000);
        case '24h':
            return new Date(now.getTime() + 24 * 60 * 60 * 1000);
        case '7d':
            return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        default:
            return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
}

interface CreateLinkParams {
    storagePath: string;
    fileName: string;
    fileSize: number;
    mimeType?: string;
    password?: string;
    expiryOption: string;
}

interface CreateLinkResult {
    token: string;
    error?: string;
}

export async function createShareLink(params: CreateLinkParams): Promise<CreateLinkResult> {
    const supabase = getSupabase();
    if (!supabase) {
        return { token: '', error: 'Supabase not configured' };
    }

    try {
        // 1. Insert into files table
        const { data: fileData, error: fileError } = await supabase
            .from('files')
            .insert({
                filename: params.fileName,
                size_bytes: params.fileSize,
                mime_type: params.mimeType || 'application/octet-stream',
                storage_path: params.storagePath,
            })
            .select('id')
            .single();

        if (fileError) {
            console.error('File insert error:', fileError);
            return { token: '', error: fileError.message };
        }

        // 2. Generate token
        const token = generateToken(20);

        // 3. Calculate expiry
        const expiresAt = calculateExpiryDate(params.expiryOption);

        // 4. Hash password if provided
        let passwordHash: string | null = null;
        if (params.password && params.password.trim() !== '') {
            passwordHash = await hashPassword(params.password);
        }

        // 5. Insert into links table
        const { error: linkError } = await supabase
            .from('links')
            .insert({
                file_id: fileData.id,
                token: token,
                password_hash: passwordHash,
                expires_at: expiresAt.toISOString(),
                is_active: true,
            });

        if (linkError) {
            console.error('Link insert error:', linkError);
            return { token: '', error: linkError.message };
        }

        return { token };
    } catch (err) {
        console.error('Create link error:', err);
        return { token: '', error: 'Failed to create share link' };
    }
}
