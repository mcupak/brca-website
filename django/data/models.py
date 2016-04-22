from django.db import models


class VariantManager(models.Manager):
    def create_variant(self, row):
        return self.create(**row)


class Variant(models.Model):

    Locus = models.TextField()
    Transcript = models.TextField()
    Allele = models.TextField()
    DNA = models.TextField()
    AA = models.TextField()
    Genome_Build = models.TextField()
    Chromosome = models.TextField()
    Genome_Build_DNA = models.TextField()
    Report_As_Allele = models.TextField()
    Report_As_DNA = models.TextField()
    Report_As_AA = models.TextField()
    Region = models.TextField()
    Cat_Dis = models.TextField()
    Non_inc_Dis = models.TextField()
    Rpt = models.TextField()
    Fam = models.TextField()
    DNA_Type = models.TextField()
    AA_Type = models.TextField()
    Cyto_Type = models.TextField()
    RS = models.TextField()
    ClinVar = models.TextField()
    Source = models.TextField()
    Alias_es = models.TextField()
    Ref = models.TextField()

    objects = VariantManager()

    class Meta:
        db_table = 'variant'

class Disease(models.Model):
    Name = models.TextField()
    Abbr = models.TextField()
    Inheritance = models.TextField()
    Codes = models.TextField()
    Description = models.TextField()
    Genes = models.TextField()
    Variants = models.TextField()

    class Meta:
        db_table = "disease"

class Gene(models.Model):
    Official_Symbol = models.TextField()
    Report_Symbol = models.TextField()
    Chr = models.TextField()
    Loc = models.TextField()
    Diseases_Drugs = models.TextField()
    Variants = models.TextField()
    Full_Name = models.TextField()
    Type = models.TextField()
    Alias_Symbols = models.TextField()

    class Meta:
        db_table = "gene"