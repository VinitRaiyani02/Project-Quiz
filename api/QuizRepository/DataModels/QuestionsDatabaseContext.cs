﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QuizRepository.DataModels
{
    public partial class QuestionsDatabaseContext : DbContext
    {
        public QuestionsDatabaseContext()
        {
        }

        public QuestionsDatabaseContext(DbContextOptions<QuestionsDatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblLanguage> TblLanguages { get; set; } = null!;
        public virtual DbSet<TblQuestion> TblQuestions { get; set; } = null!;
        public virtual DbSet<TblQuestionOption> TblQuestionOptions { get; set; } = null!;
        public virtual DbSet<TblRole> TblRoles { get; set; } = null!;
        public virtual DbSet<TblUser> TblUsers { get; set; } = null!;
        public virtual DbSet<TblUserQuestionAn> TblUserQuestionAns { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=PCT142;Database=QuestionsDatabase; User ID=sa;Password=Tatva@123;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblLanguage>(entity =>
            {
                entity.ToTable("tblLanguages");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Text).HasMaxLength(50);
            });

            modelBuilder.Entity<TblQuestion>(entity =>
            {
                entity.ToTable("tblQuestions");

                entity.Property(e => e.QuestionAns).HasMaxLength(250);

                entity.Property(e => e.Type).HasMaxLength(50);
            });

            modelBuilder.Entity<TblQuestionOption>(entity =>
            {
                entity.ToTable("tblQuestionOptions");

                entity.Property(e => e.OptionText).HasMaxLength(250);

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.TblQuestionOptions)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblQuestionOptions_tblQuestions");
            });

            modelBuilder.Entity<TblRole>(entity =>
            {
                entity.ToTable("tblRole");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.ToTable("tblUser");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Gender).HasMaxLength(50);

                entity.Property(e => e.ImagePath).HasMaxLength(250);

                entity.Property(e => e.Password).HasMaxLength(150);

                entity.Property(e => e.UserName).HasMaxLength(150);

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.TblUsers)
                    .HasForeignKey(d => d.Languageid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblUser_tblLanguages");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.TblUsers)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblUser_tblRole");
            });

            modelBuilder.Entity<TblUserQuestionAn>(entity =>
            {
                entity.ToTable("tblUserQuestionAns");

                entity.Property(e => e.QuestionAns).HasMaxLength(250);

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.TblUserQuestionAns)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblUserQu__Quest__4CA06362");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TblUserQuestionAns)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblUserQu__UserI__4BAC3F29");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
