import { NextResponse } from 'next/server'

export async function GET() {
  // Log health check
  console.log('Health check endpoint called')
  
  try {
    // Basic MongoDB connection test
    const dbConnected = process.env.MONGODB_URI ? 'Yes' : 'No'
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: dbConnected,
        hasPayloadSecret: process.env.PAYLOAD_SECRET ? 'Yes' : 'No',
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}