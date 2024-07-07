﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240707204450_ReimbursementDateReceivedNullable")]
    partial class ReimbursementDateReceivedNullable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.6");

            modelBuilder.Entity("API.Entities.Claim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("AmountBilled")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("AmountDeductible")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("AmountOwed")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateProcessed")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateVisited")
                        .HasColumnType("TEXT");

                    b.Property<string>("NetworkStatus")
                        .HasColumnType("TEXT");

                    b.Property<int>("PatientId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.ToTable("Claims");
                });

            modelBuilder.Entity("API.Entities.Member", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("API.Entities.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<int>("ClaimId")
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("DatePaid")
                        .HasColumnType("TEXT");

                    b.Property<int>("PaymentMethodId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ClaimId");

                    b.HasIndex("PaymentMethodId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("API.Entities.PaymentMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastFourDigits")
                        .HasColumnType("TEXT");

                    b.Property<string>("PaymentType")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("PaymentMethods");
                });

            modelBuilder.Entity("API.Entities.Reimbursement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<int>("ClaimId")
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly?>("DateReceived")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateSubmitted")
                        .HasColumnType("TEXT");

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
