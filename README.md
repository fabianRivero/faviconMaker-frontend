# FaviconMaker

FaviconMaker es una aplicación web que te permite crear favicons a partir de imágenes, con opciones de personalización y descarga en múltiples formatos y tamaños.

![Landing Page](/landingpage.png)
![Dashboard](/FaviconMaker.png)

## Características

✅ Sube tu imagen (PNG, JPG, SVG) y conviértela en favicon.

⚙️ Personalización: Ajusta tamaño, forma (redonda, cuadrada) y fondo.

📁 Descarga en múltiples formatos: ICO, PNG (16x16, 32x32, 48x48, etc.).

🌐 Vista previa en tiempo real del favicon en un simulador de pestaña.

## Enlaces

- Frontend: [https://github.com/fabianRivero/faviconMaker-frontend.git](https://github.com/fabianRivero/faviconMaker-frontend.git)
- Backend: [https://github.com/fabianRivero/faviconMaker-backend.git](https://github.com/fabianRivero/faviconMaker-backend.git)
- Demo: [https://faviconmaker.netlify.app/](https://faviconmaker.netlify.app/)

## ¿Cómo se utilizó Clerk?
Se utilizó Clerk para las siguientes funciones:

- Autenticación de usuarios a través de modales preconstruidos con los componentes <SignInButton> y <SignUpButton>.
```
<div className='flex flex-col sm:flex-row gap-4'>
  <SignInButton mode='modal'>
    <button className="bg-white hover:bg-gray-50 text-indigo-600 font-medium py-3 px-6 rounded-lg border border-indigo-200 shadow-sm transition-all hover:shadow-md">
      Iniciar Sesión
    </button>
  </SignInButton>
  <SignUpButton mode='modal'>
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all hover:shadow-md">
      Regístrate Gratis
    </button>
  </SignUpButton>
</div>
```
- Protección de rutas con el uso del componente <ProtectedRoute>
```
<Route path="/editor" element={
  <ProtectedRoute>
    <SidebarLayout>
      <EditorLayout>
        {(layoutProps) => (
          <Editor {...layoutProps} />
        )}
      </EditorLayout>
    </SidebarLayout>
  </ProtectedRoute>
} />
```
- Manejo de JWT para permitir a usuarios realizar operaciones CRUD al backend.
```
import { Clerk } from '@clerk/clerk-sdk-node';

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    
    const session = await clerk.verifyToken(token);
    if (!session || !session.sub) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.auth = { 
      userId: session.sub
    };
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Unauthorized' }); 
  }
};
```
