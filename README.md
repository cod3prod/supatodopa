# Supatodopa

**Supabase-js를 활용한 To-Do List 애플리케이션**

## 🎯 **프로젝트 목적**

### **핵심 목표**

- **Supabase-js를 활용한 인증 및 데이터 관리**: Supabase-js를 사용해 간단한 인증 및 데이터를 손쉽게 관리.

## 🔨 **기술 스택**

- **주요 기술**: Next.js 15
- **스타일링**: Tailwind CSS
- **라이브러리**: Zustand, Supabase-js

## 📝 **핵심 학습 내용**

### Supabase-js를 활용한 인증 상태 관리

`supabase.auth` API를 사용해 인증 상태를 구독하고, 상태를 Zustand로 관리.

```typescript
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/zustand/auth-store";
import { supabase } from "@/libs/supabase-client";

export default function Global() {
  const { setSession } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);
  return null;
}
```

## ⚙️ **프로젝트 설정**

```bash
# 패키지 설치
npm install

# 로컬 개발 환경 실행
npm run dev
```
