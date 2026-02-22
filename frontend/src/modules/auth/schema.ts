import { z } from 'zod'
import { UserRole } from './types'

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

export type LoginSchema = z.infer<typeof loginSchema>

// Company info schema
export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Tên công ty là bắt buộc')
    .min(2, 'Tên công ty phải có ít nhất 2 ký tự')
    .max(200, 'Tên công ty không được quá 200 ký tự'),
  companyPhone: z
    .string()
    .min(1, 'Số điện thoại công ty là bắt buộc')
    .regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ (10-11 số)'),
  companyAddress: z
    .string()
    .min(1, 'Địa chỉ công ty là bắt buộc')
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
  companyWebsite: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: 'Website không hợp lệ (phải bắt đầu bằng http:// hoặc https://)'
    }),
  industry: z.string().optional(),
  companySize: z.string().optional()
})

export type CompanyInfoSchema = z.infer<typeof companyInfoSchema>

// Register schema
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Tên đăng nhập là bắt buộc')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(50, 'Tên đăng nhập không được quá 50 ký tự'),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Xác nhận mật khẩu là bắt buộc'),
  fullName: z
    .string()
    .min(1, 'Họ tên là bắt buộc')
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự'),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: 'Vui lòng chọn vai trò' })
  }),
  companyInfo: companyInfoSchema.optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword']
}).refine((data) => {
  // Require companyInfo if role is EMPLOYER
  if (data.role === UserRole.EMPLOYER) {
    return !!data.companyInfo?.companyName && !!data.companyInfo?.companyPhone && !!data.companyInfo?.companyAddress
  }
  return true
}, {
  message: 'Vui lòng điền đầy đủ thông tin công ty',
  path: ['companyInfo']
})

export type RegisterSchema = z.infer<typeof registerSchema>

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

// Reset password schema
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Xác nhận mật khẩu là bắt buộc')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword']
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>