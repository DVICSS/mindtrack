import { NextRequest, NextResponse } from 'next/server';
import { updateUserPlan } from '@/lib/user-storage';

export async function POST(request: NextRequest) {
  try {
    const { userId, plan } = await request.json();

    if (!userId || !plan) {
      return NextResponse.json(
        { error: 'userId e plan são obrigatórios' },
        { status: 400 }
      );
    }

    if (plan !== 'PRO' && plan !== 'PREMIUM') {
      return NextResponse.json(
        { error: 'Plano inválido. Use PRO ou PREMIUM' },
        { status: 400 }
      );
    }

    const updatedUser = updateUserPlan(userId, plan);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Erro ao atualizar plano:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
