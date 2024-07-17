-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 juil. 2024 à 22:21
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `smartscreen`
--

-- --------------------------------------------------------

--
-- Structure de la table `claims`
--

CREATE TABLE `claims` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `claims`
--

INSERT INTO `claims` (`id`, `name`, `email`, `description`, `imageUrl`, `created_at`) VALUES
(1, 'Emna', 'emna.homrani.01@gmail.com', 'C\'est pas ma facture ', 'https://res.cloudinary.com/db2yjlbsw/image/upload/v1720921862/v9vdktfyiopduliix9yd.jpg', '2024-07-14 02:17:52'),
(2, '', '', '', 'https://res.cloudinary.com/db2yjlbsw/image/upload/v1720921862/v9vdktfyiopduliix9yd.jpg', '2024-07-14 03:25:23'),
(3, '', '', '', 'https://res.cloudinary.com/db2yjlbsw/image/upload/v1720927539/freejgq9toro1cx37yfb.jpg', '2024-07-14 03:25:45'),
(4, '', '', '', 'https://res.cloudinary.com/db2yjlbsw/image/upload/v1720921862/v9vdktfyiopduliix9yd.jpg', '2024-07-14 03:28:24');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(1, 'emna.homrani.01@gmail.com', 'emna123', ''),
(2, 'mahdi.homrani.01@gmail.com', 'mahdi123', ''),
(3, 'Nour.homrani.01@gmail.com', '$2b$10$N1YQa.dO0XvrUlQPC6buIO81HnMr53gLX27bjm03q211wXExCPwyu', ''),
(6, 'sahar.homrani.01@gmail.com', '$2b$10$9g007TzcIsZFmiNTF0GQsOljcWSREIA9xJ1HL4O96W90QlHYkkEBy', ''),
(7, 'Raoudha.homrani.01@gmail.com', '$2b$10$Nee3xkSc3uzsQAeh5w9svuGl9RoKtdVqS38MWV5rT9PZfa19Y8DlK', '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `claims`
--
ALTER TABLE `claims`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `claims`
--
ALTER TABLE `claims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
