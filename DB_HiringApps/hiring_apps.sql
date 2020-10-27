-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Okt 2020 pada 14.05
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hiring_apps`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account`
--

CREATE TABLE `account` (
  `id_account` int(100) NOT NULL,
  `roleAccount` enum('Recruiters','Freelancers','Superuser') NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `numberPhone` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `account`
--

INSERT INTO `account` (`id_account`, `roleAccount`, `name`, `email`, `numberPhone`, `password`, `status`, `createdAt`, `updateAt`) VALUES
(35, 'Freelancers', 'Budi Darmawan', 'budi123@gmail.com', '085266778899', '$2a$12$jbiQB4fMRTPK5/UzyJ5KoOyrjO3wfSGG5k9c6pw7oF7FIueMmgLea', 1, '2020-09-23 10:06:49', '2020-10-27 01:31:29'),
(43, 'Recruiters', 'Jayaaaaa', 'budi@gmail.com', '0000000000000', '$2a$12$53CFqTrLzqOdmkPxE7U8/OekTStrg2wCA7Kx3j5NdfRCsSBZkBEjy', 1, '2020-09-25 09:37:24', '2020-10-17 10:01:54'),
(47, 'Freelancers', 'Kun Aguero', 'aguero@gmail.com', '0000000000000', '$2a$12$Q.KqSE5jGeIG1R9SO3Qqd.OM0rdsFMHFbaZ9Xqz/rziiYLa38BN/y', 1, '2020-09-26 05:10:42', NULL),
(48, 'Freelancers', 'De Gea', 'degea@gmail.com', '0000000000000', '$2a$12$xLbEJde6cOQI.JLLro46KeVgT.S7WhxT7LP4JJw.OG6K8RMtCbGiS', 1, '2020-09-26 05:10:58', NULL),
(51, 'Recruiters', 'Jaya', 'jaya@gmail.com', '0000000000000', '$2a$12$M65JN1k/4N8YxeVNgOIwKuiD.4lRO3qzKD9CVK/0oPzN/pcJ1bKg2', 1, '2020-10-01 06:53:18', NULL),
(52, 'Freelancers', 'Mesut Ozil', 'ozil@gmail.com', '0000000000000', '$2a$12$5eLBeHjqmFqw3uUDNuPWwOFKCaI1tRW04j6KUTeIpizW66EtzV2Qe', 1, '2020-10-01 06:54:15', NULL),
(53, 'Recruiters', 'Joko', 'joko@gmail.com', '1234512334', '$2a$12$oLhhPJETuQoESAvR7AqLDeOOIVyUVDG5tfPipHgRecIq3Dbj6zbbu', 1, '2020-10-01 07:25:51', NULL),
(54, 'Freelancers', 'Sergio Ramos', 'ramos@gmail.com', '0000000000000', '$2a$12$xQxk3q7H/q45WxaNL3qGUebFgRr/oibMNAUmpOeocdtaupfS/sb/a', 1, '2020-10-04 12:46:29', NULL),
(55, 'Freelancers', 'Lionel Messi', 'messi@gmail.com', '0000000000000', '$2a$12$us3ShofuidsgtY.s9wXZNOlG5M5Ok1QJ0HADXsKrteM0ZbhnxMET.', 1, '2020-10-04 12:46:45', NULL),
(56, 'Freelancers', 'Antonio Griezman', 'griz@gmail.com', '0000000000000', '$2a$12$jBO/vaGn3QcddzDswqIMu.lea4RM7hwPPkx0Zpg2ZFlkGgPdH8J4a', 1, '2020-10-04 12:47:03', NULL),
(57, 'Freelancers', 'Marcelo', 'marcelo@gmail.com', '0000000000000', '$2a$12$z03wG7Lcmg1g08LCmA.KPORrmtwFaJX2f0oBOh31M6w7oxBTeZIBW', 1, '2020-10-04 12:47:15', NULL),
(58, 'Freelancers', 'Toni Kroos', 'kroos@gmail.com', '0000000000000', '$2a$12$9kP59XmU8tJdFAG3OnfEje53JM2QaGOtNWDFlYtUR5xm3B9IRUiIq', 1, '2020-10-04 12:47:29', NULL),
(59, 'Freelancers', 'Luca Modric', 'modric@gmail.com', '0000000000000', '$2a$12$SdLnei2AVWWCiBb96uX8ku/NfUf3J2qEaC3VngE9VQepAghTuTOui', 1, '2020-10-04 12:47:47', NULL),
(60, 'Freelancers', 'Coutinho', 'coutinho@gmail.com', '0000000000000', '$2a$12$OCnasx6XpXrK1wXlSuMYgOexCAFl9iU3J9MJi8nspcle3Auya9NDi', 1, '2020-10-04 12:48:03', NULL),
(61, 'Freelancers', 'Karim Benzema', 'benzema@gmail.com', '0000000000000', '$2a$12$tRxPieOcx.gfrb581FziMedcKcUIK8g6KySlVbHVmGjEu/8IUsN.O', 1, '2020-10-04 12:48:21', NULL),
(62, 'Recruiters', 'Budi Darmawan', 'budiii@gmail.com', '000000', '$2a$12$0ONkdBa5WODbHDE3Agay9OI4EijQIIh0gZ61vh2qnIXitZzQObn3u', 1, '2020-10-05 06:28:53', '2020-10-05 06:30:33'),
(63, 'Freelancers', 'Task week 12', 'week12@gmail.com', '081200009988', '$2a$12$37ngUjNxZOaGdZNCDoq6aOXZDACwRWMjfCwEgD2VqYGE3hFQlwSMe', 1, '2020-10-22 14:32:01', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `freelancers`
--

CREATE TABLE `freelancers` (
  `id_freelancer` int(11) NOT NULL,
  `id_account` int(11) NOT NULL,
  `jobDesc` varchar(100) DEFAULT NULL,
  `statusJob` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `workPlace` varchar(100) DEFAULT NULL,
  `cityAddress` varchar(100) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `freelancers`
--

INSERT INTO `freelancers` (`id_freelancer`, `id_account`, `jobDesc`, `statusJob`, `description`, `workPlace`, `cityAddress`, `image`, `createdAt`, `updateAt`) VALUES
(17, 35, 'Android Developer', 'Freelancers', 'Android Developer yang saat ini menguasai beberapa keterampilan teknis yaitu Kotlin, Javascript, MySQL, Restful API dengan Node.JS & Express.JS sebagai back-endnya', 'Jakarta', 'Balikpapan, East Borneo', 'image-1603761824657.jpg', '2020-09-23 13:10:49', '2020-10-27 07:25:15'),
(23, 47, 'IOS Developer', 'Part Time', NULL, 'Malang', 'Malang', 'aguero.png', '2020-09-26 05:10:42', NULL),
(24, 48, 'Web Developer', 'Freelancer', NULL, 'Yogyakarta', 'Yogyakarta', 'degea.png', '2020-09-26 05:10:58', NULL),
(25, 52, 'Android Developer', 'Full Time', NULL, 'Paser', 'Paser', 'ozil.png', '2020-10-01 06:54:15', NULL),
(26, 54, 'IOS Developer', 'Full Time', 'deksripsi', 'Jakarta', 'Jakarta', 'image-1601815789163.png', '2020-10-04 12:46:29', '2020-10-04 12:49:49'),
(27, 55, 'Android Developer', 'Full Time', 'deksripsi', 'Jakarta', 'Jakarta', 'image-1601815835639.png', '2020-10-04 12:46:45', '2020-10-04 12:50:35'),
(28, 56, 'Web Developer', 'Full Time', 'deksripsi', 'Bandung', 'Bandung', 'image-1601815879885.png', '2020-10-04 12:47:03', '2020-10-04 12:51:19'),
(29, 57, 'Android Developer', 'Part Time', 'deksripsi', 'Bandung', 'Bandung', 'image-1601815926650.png', '2020-10-04 12:47:15', '2020-10-04 12:52:06'),
(30, 58, 'IOS Developer', 'Part Time', 'deksripsi', 'Bandung', 'Bandung', 'image-1601815965601.png', '2020-10-04 12:47:29', '2020-10-04 12:52:45'),
(31, 59, 'Android Developer', 'Part Time', 'deksripsi', 'Malang', 'Malang', 'image-1601816008133.png', '2020-10-04 12:47:47', '2020-10-04 12:53:28'),
(32, 60, 'Android Developer', 'Part Time', 'deksripsi', 'Malang', 'Malang', 'image-1601816063383.png', '2020-10-04 12:48:03', '2020-10-04 12:54:23'),
(33, 61, 'Web Developer', 'Full Time', 'deksripsi', 'Paser', 'Paser', 'image-1601816138141.png', '2020-10-04 12:48:21', '2020-10-04 12:55:38'),
(34, 63, NULL, 'Freelancer', NULL, NULL, NULL, NULL, '2020-10-22 14:32:01', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `hire_project`
--

CREATE TABLE `hire_project` (
  `id_hire` int(100) NOT NULL,
  `id_accountRec` int(100) NOT NULL,
  `id_accountFree` int(100) NOT NULL,
  `id_project` int(100) NOT NULL,
  `message` varchar(300) NOT NULL,
  `projectJob` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `statusConfirm` int(11) NOT NULL DEFAULT 0,
  `confirmDate` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `hire_project`
--

INSERT INTO `hire_project` (`id_hire`, `id_accountRec`, `id_accountFree`, `id_project`, `message`, `projectJob`, `price`, `statusConfirm`, `confirmDate`, `createdAt`, `updateAt`) VALUES
(1, 43, 35, 15, 'Mau kerjasama bos', 'Android Developer', '100k', 0, '0000-00-00 00:00:00', '2020-10-12 02:31:13', '2020-10-26 09:37:07'),
(3, 43, 35, 45, 'dasdsadsada', 'asasa', '100k', -1, '0000-00-00 00:00:00', '2020-10-12 13:25:18', '2020-10-26 09:37:56'),
(4, 43, 48, 15, 'dsads', 'assddda', '200k', 1, NULL, '2020-10-13 06:50:32', NULL),
(5, 43, 48, 45, 'dsads', 'assddda', '50000', -1, NULL, '2020-10-13 06:50:32', NULL),
(6, 43, 47, 45, 'Kerja yok?', 'Web Developer', '100000', 1, NULL, '2020-10-15 00:49:47', NULL),
(7, 43, 55, 15, 'YUk?', 'IOS Developer', '200000', 0, NULL, '2020-10-15 03:28:28', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `portofolio`
--

CREATE TABLE `portofolio` (
  `id_portofolio` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `linkRepo` varchar(200) NOT NULL,
  `typePorto` enum('Mobile','Web') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `portofolio`
--

INSERT INTO `portofolio` (`id_portofolio`, `id_account`, `name`, `image`, `description`, `linkRepo`, `typePorto`, `createdAt`, `updateAt`) VALUES
(1, 35, 'Hiring Apps', 'portfolio4.png', 'HiringApps merupakan aplikasi perekrutan untuk membuat dan mengiklankan pekerjaan, mencari pekerja dan alur perekrutan yang mudah dan handal serta cara termudah untuk berkolaborasi dan mengelola perekrutan menggunakan aplikasi mobile untuk para perekrut.', 'bit.ly/CONTOHSAJA', 'Web', '2020-10-14 07:22:11', NULL),
(2, 47, 'Portfolio 1', 'portfolio1.png', 'deskripsi', 'www.1.com', 'Mobile', '2020-10-25 00:57:43', NULL),
(3, 47, 'Portfolio 2', 'portfolio2.png', 'deskrisi', 'www.2.com', 'Mobile', '2020-10-25 00:57:43', NULL),
(4, 47, 'Portfolio 3', 'portfolio3.png', 'deskripsi', 'www.3.com', 'Mobile', '2020-10-25 00:58:10', NULL),
(5, 47, 'Portfolio 4', 'portfolio4.png', 'deskrisi', 'www.4.com', 'Mobile', '2020-10-25 00:58:10', NULL),
(7, 35, 'Ticket-Apps', 'portfolio3.png', 'TicketApps merupakan sebuah aplikasi yang menyediakan pelayanan Online memesan tiket pesawat, dimana pengguna bisa leluasa memilih tiket pesawat dengan harga yang diinginkan', 'bit.ly/ticket_apps', 'Mobile', '2020-10-25 00:57:43', '2020-10-27 09:40:44'),
(8, 35, 'Portfolio Q', 'image-1603797848126.png', 'deskripsi', 'www.1.com', 'Mobile', '2020-10-25 00:57:43', '2020-10-27 11:25:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `project`
--

CREATE TABLE `project` (
  `id_project` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT 'default.png',
  `description` text DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `project`
--

INSERT INTO `project` (`id_project`, `id_account`, `name`, `image`, `description`, `deadline`, `createdAt`, `updateAt`) VALUES
(15, 43, 'Free Fire', 'image-1601176227003.png', 'Free Fire adalah permainan survival shooter terbaik yang tersedia di ponsel. Permainan berdurasi 10 menit ini akan menempatkan kamu di pulau terpencil dimana kamu bertarung melawan 49 pemain lainnya, dengan tujuan untuk bertahan hidup.', '2021-01-01', '2020-09-27 11:10:27', NULL),
(22, 51, 'Free Fire', 'image-1601176227003.png', 'Free Fire adalah permainan survival shooter terbaik yang tersedia di ponsel. Permainan berdurasi 10 menit ini akan menempatkan kamu di pulau terpencil dimana kamu bertarung melawan 49 pemain lainnya, dengan tujuan untuk bertahan hidup.', '2021-01-01', '2020-09-27 11:10:27', NULL),
(45, 43, 'PUBG Mobile', 'image-1602472419413.jpg', 'deskripsi', '2019-12-31', '2020-10-12 11:13:39', '2020-10-15 00:50:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `recruiters`
--

CREATE TABLE `recruiters` (
  `id_recruiter` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `sector` varchar(100) DEFAULT '',
  `city` varchar(100) DEFAULT '',
  `description` text DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `recruiters`
--

INSERT INTO `recruiters` (`id_recruiter`, `id_account`, `companyName`, `position`, `sector`, `city`, `description`, `website`, `image`, `createdAt`, `updateAt`) VALUES
(5, 43, 'Cahaya Abadi Company', 'HRD', 'Finance', 'Nunukan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu lacus fringilla, vestibulum risus at.', 'www.trex.com', 'image-1602379984905.jpg', '2020-09-25 09:37:24', '2020-10-12 03:14:10'),
(9, 51, 'PT. Cahaya Abadi', 'HRD', 'Financial', 'Bandung, Jawa Barat', NULL, NULL, NULL, '2020-10-01 06:53:18', NULL),
(10, 53, 'PT. Abu Abu', 'CEO', 'Banking', 'Malang, Jawa Timur', NULL, NULL, NULL, '2020-10-01 07:25:51', NULL),
(11, 62, 'PT. ABal ABal', 'HRD', '', 'Nunukan', '', NULL, NULL, '2020-10-05 06:28:53', '2020-10-05 06:30:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `skill`
--

CREATE TABLE `skill` (
  `id_skill` int(100) NOT NULL,
  `skill_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `skill`
--

INSERT INTO `skill` (`id_skill`, `skill_name`) VALUES
(1, 'Kotlin'),
(2, 'Java'),
(3, 'Javascript'),
(4, 'C'),
(5, 'C++'),
(6, 'Go'),
(7, 'PHP'),
(8, 'Python'),
(9, 'Pascal'),
(10, 'Ruby'),
(11, 'Swift'),
(12, 'SQL'),
(13, 'Postsgre SQL'),
(14, 'HTML'),
(15, 'CSS');

-- --------------------------------------------------------

--
-- Struktur dari tabel `skill_freelancers`
--

CREATE TABLE `skill_freelancers` (
  `id_skillfreelancer` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `id_skill` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `skill_freelancers`
--

INSERT INTO `skill_freelancers` (`id_skillfreelancer`, `id_account`, `id_skill`) VALUES
(10, 35, 1),
(11, 35, 12),
(12, 35, 2),
(13, 47, 4),
(14, 47, 5),
(17, 48, 14),
(18, 48, 15),
(19, 48, 3),
(23, 52, 1),
(24, 54, 1),
(25, 55, 1),
(26, 56, 1),
(27, 57, 1),
(28, 58, 1),
(29, 59, 1),
(30, 60, 1),
(31, 61, 1),
(32, 54, 5),
(33, 55, 3),
(34, 56, 6),
(35, 57, 7),
(36, 58, 8),
(37, 59, 9),
(38, 60, 2),
(39, 60, 5),
(40, 60, 9),
(41, 35, 4),
(42, 35, 5),
(43, 35, 14),
(44, 35, 15);

-- --------------------------------------------------------

--
-- Struktur dari tabel `work_exp`
--

CREATE TABLE `work_exp` (
  `id_exp` int(100) NOT NULL,
  `id_account` int(100) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `work_exp`
--

INSERT INTO `work_exp` (`id_exp`, `id_account`, `companyName`, `position`, `start`, `end`, `description`, `createdAt`, `updateAt`) VALUES
(2, 35, 'Arkademy Tech', 'Bootcamp - Android Developer', '2020-08-01', '2020-11-11', 'Mempersiapkan karir sebagai Android Developer profesional dengan belajar materi pemrograman yang up to date dengan kebutuhan industri saat ini. Adapun yang dipelajari adalah UI Android, Kotlin, MySQL dan Restful API dengan Node.Js & Express.Js sebagai backend nya.', '2020-09-27 09:42:16', '2020-09-27 09:47:14'),
(3, 35, 'Kantor Pelayanan Perbendaharaan Negara Kota Palu', 'Front Office Validator', '2018-06-01', '2018-08-11', 'Bertugas untuk menerima Arsip Data Komputer (ADK) beserta hardcopy Laporan Pertanggungjawaban (LPJ) Bendahara dan dokumen teknis pendukung lainnya dari Satuan Kerja (Satker). Apabila setelah dilakukan verifikasi/penelitian berkas pendukung telah dinyatakan lengkap, maka dapat mengunggah ADK pada aplikasi KPPN (SILABUN)', '2020-09-27 09:42:16', '2020-09-27 09:47:14'),
(9, 35, 'Rex Regum Qeon (RRQ)', 'Pro Player', '2020-10-01', '2020-10-21', 'Sebagai Pro Player Divisi POU yang telah menjuarai 3x turnamen major', '2020-09-27 09:42:16', '2020-09-27 09:47:14'),
(10, 35, 'Rex Regum Qeon (RRQ)', 'Manager', '2020-10-10', '2020-10-31', 'Manajer tim divisi HayDay', '2020-10-27 06:39:49', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`);

--
-- Indeks untuk tabel `freelancers`
--
ALTER TABLE `freelancers`
  ADD PRIMARY KEY (`id_freelancer`),
  ADD KEY `KeyFreelancers` (`id_account`);

--
-- Indeks untuk tabel `hire_project`
--
ALTER TABLE `hire_project`
  ADD PRIMARY KEY (`id_hire`),
  ADD KEY `KeyIDProject` (`id_project`),
  ADD KEY `KeyIDRec` (`id_accountRec`),
  ADD KEY `KeyIDFree` (`id_accountFree`);

--
-- Indeks untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`id_portofolio`),
  ADD KEY `KeyPorto` (`id_account`);

--
-- Indeks untuk tabel `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id_project`),
  ADD KEY `KeyProject` (`id_account`);

--
-- Indeks untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  ADD PRIMARY KEY (`id_recruiter`),
  ADD KEY `KeyRecruiters` (`id_account`);

--
-- Indeks untuk tabel `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id_skill`);

--
-- Indeks untuk tabel `skill_freelancers`
--
ALTER TABLE `skill_freelancers`
  ADD PRIMARY KEY (`id_skillfreelancer`),
  ADD KEY `KeyAccFree` (`id_account`),
  ADD KEY `KeySkill` (`id_skill`);

--
-- Indeks untuk tabel `work_exp`
--
ALTER TABLE `work_exp`
  ADD PRIMARY KEY (`id_exp`),
  ADD KEY `KeyExp` (`id_account`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `account`
--
ALTER TABLE `account`
  MODIFY `id_account` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `freelancers`
--
ALTER TABLE `freelancers`
  MODIFY `id_freelancer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `hire_project`
--
ALTER TABLE `hire_project`
  MODIFY `id_hire` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `id_portofolio` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `project`
--
ALTER TABLE `project`
  MODIFY `id_project` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  MODIFY `id_recruiter` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `skill`
--
ALTER TABLE `skill`
  MODIFY `id_skill` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `skill_freelancers`
--
ALTER TABLE `skill_freelancers`
  MODIFY `id_skillfreelancer` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `work_exp`
--
ALTER TABLE `work_exp`
  MODIFY `id_exp` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `freelancers`
--
ALTER TABLE `freelancers`
  ADD CONSTRAINT `KeyFreelancers` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `hire_project`
--
ALTER TABLE `hire_project`
  ADD CONSTRAINT `KeyIDFree` FOREIGN KEY (`id_accountFree`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `KeyIDProject` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `KeyIDRec` FOREIGN KEY (`id_accountRec`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `portofolio`
--
ALTER TABLE `portofolio`
  ADD CONSTRAINT `KeyPorto` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `KeyProject` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  ADD CONSTRAINT `KeyRecruiters` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `skill_freelancers`
--
ALTER TABLE `skill_freelancers`
  ADD CONSTRAINT `KeyAccFree` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `KeySkill` FOREIGN KEY (`id_skill`) REFERENCES `skill` (`id_skill`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `work_exp`
--
ALTER TABLE `work_exp`
  ADD CONSTRAINT `KeyExp` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
