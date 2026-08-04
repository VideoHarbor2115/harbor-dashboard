import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { discord, inGameName, reason, appeal } = body;

    // Discord webhook URL - replace with your actual webhook
    const webhookUrl = process.env.DISCORD_BAN_APPEAL_WEBHOOK;

    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const embed = {
      title: '📝 New Ban Appeal',
      color: 0xff6b6b,
      fields: [
        {
          name: 'Discord',
          value: discord || 'Not provided',
          inline: true,
        },
        {
          name: 'In-Game Name',
          value: inGameName || 'Not provided',
          inline: true,
        },
        {
          name: 'Ban Reason',
          value: reason || 'Not provided',
          inline: false,
        },
        {
          name: 'Appeal',
          value: appeal || 'Not provided',
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'HarborMC Ban Appeal Form',
      },
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      console.error('Discord webhook error:', response.status);
      return NextResponse.json(
        { error: 'Failed to send appeal' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ban appeal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
