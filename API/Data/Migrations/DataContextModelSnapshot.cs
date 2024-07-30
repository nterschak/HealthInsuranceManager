﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("API.Entities.Claim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("AmountBilled")
                        .HasColumnType("numeric");

                    b.Property<decimal>("AmountDeductible")
                        .HasColumnType("numeric");

                    b.Property<decimal>("AmountOwed")
                        .HasColumnType("numeric");

                    b.Property<decimal>("AmountPaidAtVisit")
                        .HasColumnType("numeric");

                    b.Property<decimal>("AmountPlanDiscount")
                        .HasColumnType("numeric");

                    b.Property<decimal>("AmountPlanPaid")
                        .HasColumnType("numeric");

                    b.Property<decimal>("AmountYourResponsibility")
                        .HasColumnType("numeric");

                    b.Property<string>("ClaimNumber")
                        .HasColumnType("text");

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<DateOnly>("DateProcessed")
                        .HasColumnType("date");

                    b.Property<DateOnly>("DateVisited")
                        .HasColumnType("date");

                    b.Property<string>("NetworkStatus")
                        .HasColumnType("text");

                    b.Property<int>("PatientId")
                        .HasColumnType("integer");

                    b.Property<string>("VisitedProvider")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.ToTable("Claims");
                });

            modelBuilder.Entity("API.Entities.Member", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("API.Entities.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<int>("ClaimId")
                        .HasColumnType("integer");

                    b.Property<DateOnly>("DatePaid")
                        .HasColumnType("date");

                    b.Property<int>("PaymentMethodId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ClaimId");

                    b.HasIndex("PaymentMethodId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("API.Entities.PaymentMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("LastFourDigits")
                        .HasColumnType("text");

                    b.Property<string>("PaymentType")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("PaymentMethods");
                });

            modelBuilder.Entity("API.Entities.Reimbursement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<int>("ClaimId")
                        .HasColumnType("integer");

                    b.Property<DateOnly?>("DateReceived")
                        .HasColumnType("date");

                    b.Property<DateOnly>("DateSubmitted")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("ClaimId");

                    b.ToTable("Reimbursements");
                });

            modelBuilder.Entity("API.Entities.Claim", b =>
                {
                    b.HasOne("API.Entities.Member", "Patient")
                        .WithMany("Claims")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("API.Entities.Payment", b =>
                {
                    b.HasOne("API.Entities.Claim", "Claim")
                        .WithMany("Payments")
                        .HasForeignKey("ClaimId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.PaymentMethod", "PaymentMethod")
                        .WithMany("Payments")
                        .HasForeignKey("PaymentMethodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Claim");

                    b.Navigation("PaymentMethod");
                });

            modelBuilder.Entity("API.Entities.Reimbursement", b =>
                {
                    b.HasOne("API.Entities.Claim", "Claim")
                        .WithMany("Reimbursements")
                        .HasForeignKey("ClaimId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Claim");
                });

            modelBuilder.Entity("API.Entities.Claim", b =>
                {
                    b.Navigation("Payments");

                    b.Navigation("Reimbursements");
                });

            modelBuilder.Entity("API.Entities.Member", b =>
                {
                    b.Navigation("Claims");
                });

            modelBuilder.Entity("API.Entities.PaymentMethod", b =>
                {
                    b.Navigation("Payments");
                });
#pragma warning restore 612, 618
        }
    }
}
