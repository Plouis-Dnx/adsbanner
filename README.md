# Ads Module - React + Supabase + Tailwind
Module React permettant d’afficher des publicités récupérées depuis Supabase, avec rotation automatique, animations, fermeture locale et affichage responsive.

## Fonctionnalités
 - Récupération des publicités depuis la base de données Supabase
 - Rotation automatique avec fade-in / fade-out
 - Bouton de fermeture de la publicité
 - Kill switch global via Supabase
 - Design responsive avec Tailwind

## Installation
1. Cloner le dépôt : 
``` bash
git clone https://github.com/Plouis-Dnx/adsbanner.git
```

2. Installer les dépendances : 
``` bash
cd adsbanner
npm install
```

3. Configurer Supabase : 
 - Créer un projet Supabase
 - Ajouter les tables `ads` et `show_ads`
 - Récupérer SUPABASE_URL et SUPABASE_ANON_KEY
 - Les placer dans le fichier .env

## Configuration de Supabase
Table `ads`
```SQL
create table ads ( 
  id serial primary key,
  image_url text,
  link text
);

alter table "ads" enable row level security;

create policy "Allow public read access"
on ads
for select
to public
using (true);
```

Table `show_ads`
``` SQL
create table show_ads ( 
  id int primary key check (id = 1), -- CHECK limits the number of lines in the table
  ads_enabled boolean default true
);

alter table "show_ads" enable row level security;

create policy "Allow public read access"
on show_ads
for select
to public
using (true);
```

Le champ `ads_enabled` sert de kill switch global.

## Structure du Projet
src/
 ├─ ads_module/
 │   ├─ components/
 │   │   └─ AdsBanner.jsx
 │   └─ hooks/
 │       └─ useAds.jsx
 ├─ api/
 │   ├─ adsApi.js
 │   ├─ enableApi.js
 │   └─ supabaseClient.js
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css

## Utilisation
``` jsx
import AdsBanner from "./ads_module/components/AdsBanner";

function App() {
  return (
    <div>
      <AdsBanner />
    </div>
  );
}
```

## Vidéo de présentation
[![Vidéo de présentation](https://img.youtube.com/vi/Ccm7CqVZvpI/maxresdefault.jpg)](https://youtu.be/Ccm7CqVZvpI)
