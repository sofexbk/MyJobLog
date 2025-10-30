# 📋 Application de Gestion des Candidatures

Une application full-stack moderne pour suivre et gérer vos candidatures d'emploi avec authentification JWT et gestion des rôles.


## 📑 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement](#-lancement)
- [API Endpoints](#-api-endpoints)
- [Structure du projet](#-structure-du-projet)
- [Contributeurs](#-contributeurs)

## ✨ Fonctionnalités

### Authentification
- ✅ Inscription et connexion avec JWT
- ✅ Protection des routes
- ✅ Gestion des rôles (USER/ADMIN)
- ✅ Déconnexion sécurisée

### Gestion des candidatures
- ✅ Créer une nouvelle candidature
- ✅ Modifier ses candidatures
- ✅ Supprimer ses candidatures
- ✅ Filtrer par statut (Envoyé, Entretien, Accepté, Refusé)
- ✅ Recherche par poste ou entreprise
- ✅ Statistiques en temps réel

### Interface utilisateur
- ✅ Design moderne et responsive
- ✅ Tableau de bord intuitif
- ✅ Modales pour création/édition
- ✅ Feedback visuel instantané
- ✅ Mode sombre (optionnel)

### Administration
- ✅ Les admins peuvent voir toutes les candidatures
- ✅ Modification des statuts par les admins
- ✅ Gestion centralisée

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │    Backend      │         │   Database      │
│   (Next.js)     │◄───────►│  (Spring Boot)  │◄───────►│  (Mysql)   │
│   Port: 3000    │   HTTP  │   Port: 8080    │   JDBC  │   Port: 5432    │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Design Patterns utilisés
- **MVC** : Séparation des couches (Controller, Service, Repository)
- **DTO Pattern** : Transfer objects entre les couches
- **Mapper Pattern** : Conversion Entity ↔ DTO
- **Observer Pattern** : Notifications de changement de statut
- **Dependency Injection** : Avec Spring et React Context

## 🛠️ Technologies

### Backend
- **Java 17**
- **Spring Boot 3.x**
  - Spring Security
  - Spring Data JPA
  - Spring Web
- **JWT** (JSON Web Tokens)
- **MySQl**
- **Maven**

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**
- **Tailwind CSS**
- **Axios**
- **jwt-decode**

## 📋 Prérequis

- **Java JDK 17+** : [Télécharger](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** : [Télécharger](https://nodejs.org/)
- **Maven 3.8+** : [Télécharger](https://maven.apache.org/download.cgi)
- **Git** : [Télécharger](https://git-scm.com/downloads)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/candidature-app.git
cd candidature-app
```

### 2. Configuration de la base de données

Créez une base de données Mysql :

```sql
CREATE DATABASE candidature_db;
CREATE USER candidature_user WITH PASSWORD 'votre_password';
GRANT ALL PRIVILEGES ON DATABASE candidature_db TO candidature_user;
```

### 3. Installation Backend

```bash
cd back
```

Créez le fichier `src/main/resources/application.properties` :

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3066/candidature_db
spring.datasource.username=candidature_user
spring.datasource.password=votre_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=votre_secret_key_super_securisee_minimum_256_bits
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

Installez les dépendances :

```bash
mvn clean install
```

### 4. Installation Frontend

```bash
cd ../front
npm install
```

Créez le fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## ⚙️ Configuration

### CORS Configuration (Backend)

Créez `config/CorsConfig.java` :

```java
package org.example.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Security Configuration (Backend)

Assurez-vous que `SecurityConfig.java` autorise les endpoints publics :

```java
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**").permitAll()
    .anyRequest().authenticated()
);
```

## 🎬 Lancement

### Démarrer le Backend

```bash
cd back
mvn spring-boot:run
```

Le backend sera accessible sur : `http://localhost:8080`

### Démarrer le Frontend

```bash
cd front
npm run dev
```

Le frontend sera accessible sur : `http://localhost:3000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Inscription | ❌ |
| POST | `/api/auth/login` | Connexion | ❌ |

### Candidatures

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/candidatures/me` | Mes candidatures | ✅ |
| GET | `/api/candidatures/all` | Toutes les candidatures (Admin) | ✅ |
| POST | `/api/candidatures` | Créer une candidature | ✅ |
| PUT | `/api/candidatures/{id}` | Modifier une candidature | ✅ |
| DELETE | `/api/candidatures/{id}` | Supprimer une candidature | ✅ |
| PUT | `/api/candidatures/{id}/status?status=ACCEPTE` | Changer le statut | ✅ |

### Exemples de requêtes

#### Inscription
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Connexion
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

#### Créer une candidature
```bash
curl -X POST http://localhost:8080/api/candidatures \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Développeur Full Stack",
    "company": "Google",
    "status": "ENVOYE",
    "link": "https://careers.google.com",
    "note": "Candidature spontanée"
  }'
```

## 📁 Structure du projet

```
candidature-app/
├── back/                           # Backend Spring Boot
│   ├── src/main/java/org/example/back/
│   │   ├── config/                 # Configuration (Security, CORS)
│   │   ├── controllers/            # REST Controllers
│   │   ├── dtos/                   # Data Transfer Objects
│   │   ├── enums/                  # Enumerations (Status, Role)
│   │   ├── events/                 # Observer Pattern
│   │   ├── mappers/                # Entity ↔ DTO Mappers
│   │   ├── models/                 # Entities JPA
│   │   ├── repositories/           # Spring Data Repositories
│   │   ├── services/               # Business Logic
│   │   └── BackApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── front/                          # Frontend Next.js
    ├── app/                        # App Router
    │   ├── dashboard/              # Page Dashboard
    │   ├── login/                  # Page Login
    │   ├── register/               # Page Register
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/                 # Composants React
    │   ├── CandidatureCard.tsx
    │   ├── CandidatureModal.tsx
    │   └── ProtectedRoute.tsx
    ├── context/                    # React Context
    │   └── AuthContext.tsx
    ├── lib/                        # Utilitaires
    │   ├── api.ts
    │   └── auth.ts
    ├── services/                   # Services API
    │   ├── authService.ts
    │   └── candidatureService.ts
    ├── types/                      # TypeScript Types
    │   └── index.ts
    ├── .env.local
    ├── package.json
    └── tailwind.config.ts
```


## 🔐 Sécurité

- ✅ Mots de passe hashés avec BCrypt
- ✅ Tokens JWT avec expiration
- ✅ Protection CSRF
- ✅ Validation des inputs
- ✅ Protection des routes sensibles
- ✅ CORS configuré

## 🧪 Tests

### Backend
```bash
cd back
mvn test
```

### Frontend
```bash
cd front
npm test
```

## 📦 Build Production

### Backend
```bash
cd back
mvn clean package
java -jar target/back-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd front
npm run build
npm start
```

## 🐛 Résolution de problèmes

### Le backend ne démarre pas
- Vérifiez que Mysql est démarré
- Vérifiez les credentials dans `application.properties`
- Assurez-vous que le port 8080 est libre

### Erreur CORS
- Vérifiez que `CorsConfig` est bien configuré
- Vérifiez que l'URL du frontend est autorisée

### Erreur JWT
- Vérifiez que `jwt.secret` a au moins 256 bits
- Vérifiez que le token n'est pas expiré
- Vérifiez le format : `Bearer <token>`

## 🙏 Remerciements

- Spring Boot Documentation
- Next.js Documentation
- Tailwind CSS
- La communauté open source

---

**Fait avec ❤️ par Soufian Bouktaib**

Pour toute question : soufianbouktaib1@gmail.com